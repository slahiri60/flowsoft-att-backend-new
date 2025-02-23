import mongoose from 'mongoose';

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
    required: [true, 'Please add a criticality value'],
    enum: ['high', 'medium', 'low'],
    default: 'high',
  },
  importance: {
    type: [String],
    required: [true, 'Please add an importance value'],
    enum: ['important', 'unimportant'],
    default: 'important',
  },
  dueDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('ActionItem', ActionitemSchema);
