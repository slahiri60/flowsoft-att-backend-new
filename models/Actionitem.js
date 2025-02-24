const mongoose = require('mongoose');

const ActionitemSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: [true, 'Please add a summary'],
    trim: true,
    maxlength: [50, 'Summary cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  criticality: {
    type: [String],
    enum: ['critical', 'noncritical'],
    default: 'critical',
  },
  importance: {
    type: [String],
    enum: ['important', 'unimportant'],
    default: 'important',
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: [String],
    enum: ['Pending', 'In Progress', 'Completed', 'Dropped'],
    default: 'Pending',
  },
  timesdeferred: {
    type: Number,
    default: 0,
  },
});

// Function to Add days to current date based on Criticality and Importance
function addDays(date, criticality, importance) {
  const newDate = new Date(date);
  let days = 0;
  if (criticality == 'critical' && importance == 'important') {
    days = 7;
  } else if (criticality == 'critical' && importance == 'unimportant') {
    days = 14;
  } else if (criticality == 'noncritical' && importance == 'important') {
    days = 21;
  } else if (criticality == 'noncritical' && importance == 'unimportant') {
    days = 28;
  }

  newDate.setDate(date.getDate() + days);
  return newDate;
}

ActionitemSchema.pre('save', function (next) {
  this.dueDate = addDays(this.dueDate, this.criticality, this.importance);
  next();
});

module.exports = mongoose.model('ActionItem', ActionitemSchema);
