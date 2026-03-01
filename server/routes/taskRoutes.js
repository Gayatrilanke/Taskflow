const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasksByProject,
  toggleTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasksByProject);
router.patch("/:id", protect, toggleTask);

// ✅ VERY IMPORTANT
router.delete("/:id", protect, deleteTask);

module.exports = router;
