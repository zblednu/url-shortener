import express from "express";
import { get, add } from "./db-layer.js";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("src"));

const port = 3000;

app.post("/", async (req, res) => {
  try {
    const url = req.body.url;
    const shortened = await add(url);

    res.status(200).send(JSON.stringify({ "url": shortened}))
  } catch {
    res.status(400).send("shit happened");
  }
});

app.listen(port, () => {
  console.log(`live at ${port}`);
});
