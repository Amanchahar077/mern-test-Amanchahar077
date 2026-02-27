import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.data);
    } catch (error) {
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (taskData) => {
    try {
      await API.post("/tasks", taskData);
      fetchTasks();
    } catch (error) {
      alert("Task creation failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      alert("Task deletion failed");
    }
  };

  const toggleStatus = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      fetchTasks();
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Your Tasks</h2>

        <TaskForm onCreate={createTask} />

        <br />

        {tasks.map((task) => (
          <div key={task._id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>

            <button onClick={() => toggleStatus(task)}>
              Toggle Status
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;