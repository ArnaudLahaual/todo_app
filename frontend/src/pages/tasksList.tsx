import { useEffect, useState } from "react";
import type { Task } from "../../../backend/src/types/task";
import axios from "axios";

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleGetTasks = () => {
    axios
      .get("http://localhost:3000/api/tasks/")
      .then((resp) => {
        setTasks(resp.data);
      })
      .catch((err) => {
        console.error("Erreur fetch tasks :", err);
      });
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <div>
      <h1>Liste des tâchessssss</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}-{task.done ? "Faite" : "Pas faite"}
          </li>
        ))}
      </ul>
    </div>
  );
}
