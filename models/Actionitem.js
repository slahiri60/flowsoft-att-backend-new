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
    enum: ['Critical', 'Noncritical'],
    default: 'Critical',
  },
  importance: {
    type: [String],
    enum: ['Important', 'Unimportant'],
    default: 'Important',
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
  if (criticality == 'Critical' && importance == 'Important') {
    days = 7;
  } else if (criticality == 'Critical' && importance == 'Unimportant') {
    days = 14;
  } else if (criticality == 'Noncritical' && importance == 'Important') {
    days = 21;
  } else if (criticality == 'Noncritical' && importance == 'Unimportant') {
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
