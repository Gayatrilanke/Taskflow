import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  // 🔹 PROJECT STATES
  const [projects, setProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  // 🔹 TASK STATES
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  // 🔹 FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 CREATE PROJECT
  const createProject = async () => {
    if (!projectName) return alert("Subject name required");

    await axios.post(
      "http://localhost:5000/api/projects",
      { name: projectName, description: projectDesc },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setProjectName("");
    setProjectDesc("");
    setShowProjectForm(false);
    fetchProjects();
  };

  // 🔹 DELETE PROJECT
  const deleteProject = async (projectId) => {
    if (!window.confirm("Delete this subject?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchProjects();
      setSelectedProject(null);
      setTasks([]);
    } catch (err) {
      alert("Failed to delete subject");
    }
  };

  // 🔹 FETCH TASKS
  const fetchTasks = async (projectId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/${projectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(res.data);
      setSelectedProject(projectId);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 CREATE TASK
  const createTask = async () => {
    if (!taskTitle) return alert("Assignment title required");

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title: taskTitle, projectId: selectedProject },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTaskTitle("");
    setShowTaskForm(false);
    fetchTasks(selectedProject);
  };

  // 🔹 TOGGLE TASK
  const toggleTask = async (taskId) => {
    await axios.patch(
      `http://localhost:5000/api/tasks/${taskId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks(selectedProject);
  };

  // 🔹 DELETE TASK
  const deleteTask = async (taskId) => {
    if (!window.confirm("Delete this assignment?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks(selectedProject);
    } catch (err) {
      alert("Failed to delete assignment");
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto" }}>
      {/* HEADER */}
      <div className="card">
        <h2>Dashboard</h2>
        <p>
          Welcome <strong>{user.name || "User"}</strong> 👋
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* SUBJECTS */}
        <div className="card">
          <h3>Your Project</h3>

          <ul style={{ padding: 0 }}>
            {projects.map((p) => (
              <li
                key={p._id}
                style={{
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                  background:
                    selectedProject === p._id ? "#4f46e5" : "#020617",
                  color:
                    selectedProject === p._id ? "white" : "inherit",
                }}
              >
                <div
                  onClick={() => fetchTasks(p._id)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{p.name}</strong>
                  <br />
                  <small>{p.description}</small>
                </div>

                <button
                  onClick={() => deleteProject(p._id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "5px 8px",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <button onClick={() => setShowProjectForm(!showProjectForm)}>
            + Add Project
          </button>

          {showProjectForm && (
            <>
              <input
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <textarea
                placeholder="Project description"
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
              />
              <button onClick={createProject}>Create</button>
            </>
          )}
        </div>

        {/* ASSIGNMENTS */}
        <div className="card">
          <h3>Your Task</h3>

          {tasks.length === 0 ? (
            <p>No tasks yet.</p>
          ) : (
            <ul style={{ padding: 0 }}>
              {tasks.map((t) => (
                <li
                  key={t._id}
                  style={{
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    background: "#020617",
                    textDecoration: t.completed ? "line-through" : "none",
                    opacity: t.completed ? 0.6 : 1,
                  }}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleTask(t._id)}
                    />
                    {t.title}
                  </div>

                  <button
                    onClick={() => deleteTask(t._id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      cursor: "pointer",
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}

          {selectedProject && (
            <>
              <button onClick={() => setShowTaskForm(!showTaskForm)}>
                + Create Task
              </button>

              {showTaskForm && (
                <>
                  <input
                    placeholder="Task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                  <button onClick={createTask}>Create</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
