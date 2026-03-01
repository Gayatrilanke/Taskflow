const Task = require("../models/Task");

// 🔹 CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, projectId, priority } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const task = await Task.create({
      title,
      project: projectId,
      owner: req.user._id,
      priority: priority || "MEDIUM",
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

// 🔹 GET TASKS BY PROJECT
const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
      owner: req.user._id,
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// 🔹 TOGGLE TASK STATUS
const toggleTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

// 🔹 DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

module.exports = {
  createTask,
  getTasksByProject,
  toggleTask,
  deleteTask,
};
