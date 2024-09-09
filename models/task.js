const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String },
  originalStatus: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);
