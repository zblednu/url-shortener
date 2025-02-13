import { get, add } from "./db-layer.js";
import http from "node:http";
import fs from "node:fs";
import { URL } from "node:url";

function isAbsoluteURL(string) {
	try {
		new URL(string);
		return true;
	} catch {
		return false;
	}
}

const server = http.createServer( async (req, res) => {
	switch(req.method) {
		case "GET":
			let { url } = req;

			const resource = url.slice(1);
			try {
				const original = await get(resource);
				res.statusCode = 301;
				res.setHeader("Location", original);
				return res.end();
			} catch {
        res.statusCode = 404;
        return res.end();
			}
			break;

	case "POST":
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
          res.statusCode = 400;
          return res.end();
        }

        const original = body.url;
        if (!original || !isAbsoluteURL(original)) {
          res.statusCode = 400;
          return res.end();
        }


        const shortened = await add(original);
        res.statusCode = 201; //created
        res.end(JSON.stringify({ url: shortened }));
      });
			break;

		default:
			res.statusCode = 400;
			res.end("processing only GET or POST methods");
  }
});


const PORT = 3000;

process.on("SIGINT", () => {
	server.close();
	console.log("server terminated");
})

server.listen(PORT, () => {
	console.log(`running at http://localhost:${PORT}`);
});
