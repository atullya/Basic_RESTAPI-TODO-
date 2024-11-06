const mongoose = require("mongoose");

const connecttoDB = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/BookStore");
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log(" MONGODB connection failed", error);
    process.exit(1);
  }
};
module.exports = connecttoDB;
