import { Router } from "express";
import { createTask, deleteTask, getTasks } from "../controllers/taskController";

const router = Router();

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.delete("/tasks/:id", deleteTask);

export default router;
