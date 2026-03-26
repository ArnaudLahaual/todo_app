import { Request, Response } from "express";
import { tasks } from "../datas/tasks";

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};
