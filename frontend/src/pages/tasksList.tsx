import { useEffect, useState } from "react";
import type { Task } from "../../../backend/src/types/task";
import { Input } from "antd";
import axios from "axios";
import {
  CarryOutOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState<string>("");

  const handleGetTasks = () => {
    axios
      .get("http://localhost:3000/api/tasks/")
      .then((resp) => {
        setTasks(resp.data);
      })
      .catch((err) => {
        console.error("erreur récupération des tâches :", err);
      });
  };

  const deleteTask = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${id}`)
      .then(() => {
        console.log("tache supprimée");
        handleGetTasks();
      })
      .catch((err) => {
        console.error("erreur suppression de la tâche :", err);
      });
  };

  const handleAddTask = (value: string) => {
    axios
      .post("http://localhost:3000/api/tasks/", { title: value })
      .then((resp) => {
        console.log(resp);
        handleGetTasks();
        setValue("");
      })
      .catch((err) => {
        console.error("erreur ajout de la tâche :", err);
      });
  };

  useEffect(() => {
    handleGetTasks();
    console.log(value);
  }, [value]);

  return (
    <div>
      <h1>Liste des tâches</h1>
      <Input
        style={{ width: "300px" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ajouter une nouvelle tâche"
      />
      {value && (
        <PlusOutlined
          onClick={() => handleAddTask(value)}
          style={{ marginLeft: "5px", cursor: "pointer" }}
        />
      )}
      <ul>
        {tasks.map((task) => (
          <li style={{ margin: "10px", listStyle: "none" }} key={task.id}>
            {task.title}{" "}
            {task.done ? (
              <CheckCircleOutlined style={{ color: "green" }} />
            ) : (
              "A faire"
            )}
            <DeleteOutlined
              style={{ margin: "0 5px", color: "red", cursor: "pointer" }}
              onClick={() => deleteTask(task.id)}
            />
            <EditOutlined />
          </li>
        ))}
      </ul>
    </div>
  );
}
