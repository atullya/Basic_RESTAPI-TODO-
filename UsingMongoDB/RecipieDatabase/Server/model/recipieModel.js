import mongoose from "mongoose";

export const RecipesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String], // An array of strings for ingredients
    required: true,
  },
  instructions: {
    type: [String], // An array of strings for instructions
    required: true,
  },
});

// Corrected the typo here
export const Recipee = mongoose.model("Recipe", RecipesSchema);
