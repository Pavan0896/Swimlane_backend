const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const TaskHistory = require('../models/taskHistory');

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/task-history', async (req, res) => {
  try {
    const histories = await TaskHistory.find();
    res.json(histories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/task-history', async (req, res) => {
  const history = new TaskHistory(req.body);
  try {
    const newHistory = await history.save();
    res.status(201).json(newHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
