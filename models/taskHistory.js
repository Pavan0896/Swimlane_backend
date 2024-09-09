const mongoose = require('mongoose');

const taskHistorySchema = new mongoose.Schema({
  task: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  additionalInfo: { type: String }
});

module.exports = mongoose.model('TaskHistory', taskHistorySchema);
