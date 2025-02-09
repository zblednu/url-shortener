import { get, add } from "./db-layer.js";
import http from "node:http";
import fs from "node:fs";

const server = http.createServer(async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    let { url } = req;
		console.log(url);
    if (url === "/") {
      url = "/index.html";
    }
    const resource = url.slice(1);
    try {
      const original = await get(resource);
			console.log(original);
			

      res.statusCode = 302;
      res.setHeader("Location", original);
      return res.end("");
			console.log("ding");
    } catch(e) {
      try {
        const fileContents = fs.readFileSync(`src/${resource}`);
        res.statusCode = 200;
        if (resource.includes("js")) {
          res.setHeader("content-type", "text/javascript");
        }
        return res.end(fileContents);

      } catch(e) {
        res.statusCode = 404;
        return res.end("");
      }
    }
  }

  else if (method === "POST") {
    let body = [];
    req
      .on("error", err => {
        console.error(err);
      })
      .on("data", chunk => {
        body.push(chunk);
      })
      .on("end", async () => {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch(e) {
          res.statusCode = 404;
          return res.end("");
        }

        const original = body.url;
        if (!original) {
          res.statusCode = 404;
          return res.end("");
        }

        const shortened = await add(original);
        res.statusCode = 200;
        res.end(JSON.stringify({ url: shortened }));
      });
  }
});


const PORT = 3000;

process.on("SIGINT", () => {
	server.close();
	console.log("server terminated");
})
server.listen(PORT);
