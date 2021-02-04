const mongoose = require('../../Database/connection')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.Now
  }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task