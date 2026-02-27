import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Redirect if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");

      // safer handling
      if (res.data && res.data.data) {
        setTasks(res.data.data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch tasks");
    }
  };

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  // Create task
  const createTask = async (taskData) => {
    try {
      await API.post("/tasks", taskData);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Task creation failed");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Task deletion failed");
    }
  };

  // Toggle status
  const toggleStatus = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "pending" ? "completed" : "pending",
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <h2>Your Tasks</h2>

        <TaskForm onCreate={createTask} />

        <br />

        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>
                Status:{" "}
                <strong
                  style={{
                    color:
                      task.status === "completed" ? "green" : "orange",
                  }}
                >
                  {task.status}
                </strong>
              </p>

              <div className="task-actions">
                <button onClick={() => toggleStatus(task)}>
                  Toggle Status
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  style={{ marginLeft: "10px", backgroundColor: "red" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;