const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const TaskHistory = require("../models/taskHistory");

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/task-history/:taskTitle", async (req, res) => {
  try {
    const { taskTitle } = req.params;
    if (!taskTitle) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const histories = await TaskHistory.find({ task: taskTitle });

    if (histories.length === 0) {
      return res
        .status(404)
        .json({ message: "No history found for this task" });
    }

    res.json(histories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/task-history", async (req, res) => {
  const { task, from, to, date, additionalInfo } = req.body;

  if (!task || !from || !to || !date) {
    return res
      .status(400)
      .json({ message: "Task, from, to, and date are required" });
  }

  const history = new TaskHistory({
    task,
    from,
    to,
    date,
    additionalInfo,
  });

  try {
    const newHistory = await history.save();
    res.status(201).json(newHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
