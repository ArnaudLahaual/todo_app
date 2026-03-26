import express from "express";
import taskRoutes from "./routes/taskRoutes";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", taskRoutes);

app.listen(port, () => {
  console.log(`test de l'application sur http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("home");
});
