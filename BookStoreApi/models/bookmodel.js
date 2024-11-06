const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
    maxLength: [100, "Book title cannnot be more thatn 100 letters"],
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Publication Year is required"],
    min: [1000, "Year must be atleast 1000"],
    max: [new Date().getFullYear(), "Year cannot be in future"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Book", BookSchema);
