import { useEffect, useState } from "react";
import type { Task } from "../../../backend/src/types/task";
import { Input } from "antd";
import axios from "axios";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { enqueueSnackbar } from "notistack";

export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState<string>("");
  const [isEditingValue, setIsEditingValue] = useState<string>("");
  const [isEditingId, setIsEditingId] = useState<number | null>(null);

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
        handleGetTasks();
        enqueueSnackbar("Tâche supprimée avec succès", { variant: "success" });
      })
      .catch((err) => {
        console.error("erreur suppression de la tâche :", err);
        enqueueSnackbar("Erreur lors de la suppression de la tâche", {
          variant: "error",
        });
      });
  };

  const handleAddTask = (value: string) => {

    axios
      .post("http://localhost:3000/api/tasks/", { title: value })
      .then((resp) => {
        console.log(resp.data);

        handleGetTasks();
        setValue("");

        enqueueSnackbar("Tâche ajoutée avec succès", { variant: "success" });
      })
      .catch((err) => {
        const message =
          err.response?.data.message || "Erreur lors de l'ajout de la tâche";
        console.error("erreur ajout de la tâche :", err);
        enqueueSnackbar(message, {
          variant: "error",
        });
      });
  };

  const handleUpdateTask = (id: number) => {
    axios
      .put(`http://localhost:3000/api/tasks/${id}`, { title: isEditingValue })
      .then(() => {
        setIsEditingId(null);
        setIsEditingValue("");
        handleGetTasks();
        enqueueSnackbar("Tâche modifiée avec succès", { variant: "success" });
      })
      .catch((err) => {
        console.error("erreur modification de la tâche :", err);
        enqueueSnackbar("Erreur lors de la modification de la tâche", {
          variant: "error",
        });
      });
  };

  const toggleTask = (task: Task) => {
    axios
      .put(`http://localhost:3000/api/tasks/${task.id}`, {
        title: task.title,
        done: !task.done,
      })
      .then(() => {
        console.log(task.title);
        console.log(task.done);

        handleGetTasks();
      })
      .catch((err) => {
        console.error("erreur modification de la tâche :", err);
      });
  };

  useEffect(() => {
    handleGetTasks();
  }, [value]);

  return (
    <div>
      <h1>Liste des tâches</h1>
      <Input
        style={{ width: "300px" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ajouter une nouvelle tâche"
        onPressEnter={() => handleAddTask(value)}
      />
      {value && (
        <PlusOutlined
          onClick={() => handleAddTask(value)}
          style={{ marginLeft: "5px", cursor: "pointer" }}
        />
      )}
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          // background: "blue",
        }}
      >
        {tasks.length
          ? tasks.map((task) => (
              <li
                style={{
                  width: "500px",
                  margin: "10px 0",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  listStyle: "none",
                  border: "1px solid #f0f0f0",
                  borderRadius: "5px",
                  backgroundColor: "#fafafa",
                }}
                key={task.id}
              >
                {isEditingId === task.id ? (
                  <Input
                    style={{ width: "300px" }}
                    value={isEditingValue}
                    onChange={(e) => setIsEditingValue(e.target.value)}
                    placeholder="Modifier la nouvelle tâche"
                    onPressEnter={() => handleUpdateTask(task.id)}
                  />
                ) : (
                  <span>{task.title}</span>
                )}

                <div>
                  <span
                    onClick={() => toggleTask(task)}
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                      color: task.done ? "green" : "orange",
                      fontWeight: 500,
                    }}
                  >
                    {task.done ? <CheckCircleOutlined /> : "A faire"}
                  </span>

                  <DeleteOutlined
                    style={{ margin: "0 5px", color: "red", cursor: "pointer" }}
                    onClick={() => deleteTask(task.id)}
                  />
                  <EditOutlined
                    onClick={() => {
                      (setIsEditingId(task.id), setIsEditingValue(task.title));
                    }}
                  />
                </div>
              </li>
            ))
          : "Aucune tâches trouvées"}
      </ul>
    </div>
  );
}
