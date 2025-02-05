import { get, add } from "./db-layer.js";
import http from "node:http";
import fs from "node:fs";

const server = http.createServer(async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    let { url } = req;
    if (url === "/") {
      url = "/index.html";
    }
    const resource = url.slice(1);
    try {
      const original = await get(resource);
      res.statusCode = 301;
      res.setHeader("Location", original);
      res.end("");
    } catch(e) {
      console.error(e);
      try {
        const fileContents = fs.readFileSync(`src/${resource}`);
        res.statusCode = 200;
        res.end(fileContents);

      } catch(e) {
        console.error(e);
        res.statusCode = 404;
        res.end("");
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
          console.error(e);
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
server.listen(PORT);
