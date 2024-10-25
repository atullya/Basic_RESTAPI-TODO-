// models/todoModel.js
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const ToDo = mongoose.model("ToDo", todoSchema);

export default ToDo;
