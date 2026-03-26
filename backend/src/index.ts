import express from "express";
import { task } from "./types/Task";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Test app listening at http://localhost:${port}`);
});
