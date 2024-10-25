import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import recipieRoute from "./routes/recipieRoute.js";
import { Recipee } from "./model/recipieModel.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const DBconnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Recipieeeeeeee", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Database");

    // Insert sample data after connecting to the database
    // await insertSampleData(); // Call the function to insert data
  } catch (error) {
    console.error("Can't Connect", error);
    process.exit(1);
  }
};

// Function to insert sample data
// const insertSampleData = async () => {
//   const recipes = [
//     {
//       title: "Spaghetti Bolognese",
//       ingredients: [
//         "400g spaghetti",
//         "2 tbsp olive oil",
//         "1 onion, chopped",
//         "2 garlic cloves, minced",
//         "400g ground beef",
//         "800g canned tomatoes",
//         "Salt and pepper to taste",
//         "Parmesan cheese, grated",
//       ],
//       instructions: [
//         "Cook the spaghetti according to the package instructions.",
//         "Heat the olive oil in a large pan over medium heat.",
//         "Add the onion and garlic, and cook until soft.",
//         "Add the ground beef and cook until browned.",
//         "Stir in the canned tomatoes and bring to a simmer.",
//         "Season with salt and pepper.",
//         "Serve the sauce over the cooked spaghetti and top with Parmesan cheese.",
//       ],
//     },
//     {
//       title: "Chicken Curry",
//       ingredients: [
//         "500g chicken, chopped",
//         "2 tbsp curry powder",
//         "1 onion, chopped",
//         "2 garlic cloves, minced",
//         "400ml coconut milk",
//         "Salt and pepper to taste",
//         "Fresh cilantro, for garnish",
//       ],
//       instructions: [
//         "In a large pot, sauté the onion and garlic until soft.",
//         "Add the chicken and curry powder, and cook until the chicken is browned.",
//         "Pour in the coconut milk and bring to a simmer.",
//         "Season with salt and pepper, and cook until the chicken is cooked through.",
//         "Garnish with fresh cilantro before serving.",
//       ],
//     },
//     // Add more recipes as needed
//   ];

//   try {
//     // Clear existing recipes before inserting new ones (optional)

//     await Recipee.insertMany(recipes);
//     console.log("Sample recipes inserted successfully!");
//   } catch (error) {
//     console.error("Error inserting recipes:", error);
//   }
// };

// Use recipe routes
app.use("/api/recipiee", recipieRoute);

// Base route for testing
app.get("/", (req, res) => {
  res.send("Hello, World! This is your Express server.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Call the database connection function
DBconnect();
