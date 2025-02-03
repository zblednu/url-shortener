import express from "express";
import { get, add } from "./db-layer.js";



const app = express();
app.use(express.json());

const port = 3000;

app.post("/", async (req, res) => {
  try {
    const url = req.body.url;
    const shortened = await add(url);
  } catch {
    res.status(404).send(null);
  }

  res.send(null); 
});

app.listen(port, () => {
  console.log(`live at ${port}`);
});
