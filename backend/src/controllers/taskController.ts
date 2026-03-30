import { Request, Response } from "express";
import { tasks } from "../datas/tasks";

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const { title } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title: title,
    done: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const deleteTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    res.status(404).json({ message: "Tâche non trouvée" });
  } else {
    tasks.splice(index, 1);
    res.status(200).json(tasks);
  }
};
