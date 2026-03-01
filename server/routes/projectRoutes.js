const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  deleteProject,   // ✅ ADD THIS
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

// CREATE PROJECT
router.post("/", protect, createProject);

// GET PROJECTS
router.get("/", protect, getProjects);

// DELETE PROJECT  ✅ ADD THIS
router.delete("/:id", protect, deleteProject);

module.exports = router;
