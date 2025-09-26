import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    required: [true, "must choose a priority"],
  },
  tags: {
    type: [
      {
        id: { type: String, required: false },
        text: { type: String, required: true, trim: true },
        color: { type: String, required: true },
      },
    ],
    default: [],
  },
  date: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("task", taskSchema);

export default Task;
