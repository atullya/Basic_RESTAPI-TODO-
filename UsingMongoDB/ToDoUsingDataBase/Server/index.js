import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoutes from "./Routes/todoRoutes.js";
import ToDo from "./models/todoModel.js";

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use todoRoutes for the /api/todos endpoint
app.use("/api/todos", todoRoutes);

// Database Connection and Seeding
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todoApplication", {
      // useNewUrlParser and useUnifiedTopology are deprecated and can be removed
    });
    console.log("Connected to MongoDB Database");

    // Call the seed function after connecting to the database
    // await seedTodos();
  } catch (error) {
    console.error(`Error in MongoDB connection: ${error.message}`);
    process.exit(1);
  }
};

// Function to seed the database with initial todos
// const seedTodos = async () => {
//   try {
//     const todos = [
//       { title: "Learn Express", completed: false },
//       { title: "Write documentation", completed: false },
//       { title: "Build a ToDo app", completed: false },
//     ];

//     // Directly insert todos
//     await ToDo.insertMany(todos);
//     console.log("Seeded initial todos");
//   } catch (error) {
//     console.error(`Error seeding todos: ${error.message}`);
//   }
// };

// Call the connectDB function to initiate the connection
connectDB();

// REST API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ToDO app</h1>");
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
