const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!!");
  } catch (error) {
    console.log("Mongodg coneection failed", error);
    process.exit(1);
  }
};
module.exports = connectToDb;
