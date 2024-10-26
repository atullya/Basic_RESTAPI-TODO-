import { Recipee } from "../model/recipieModel.js";

const getAllRecipie = async (req, res) => {
  try {
    const finalRecipie = await Recipee.find({});
    return res.json(finalRecipie); // Send the result using res.json()
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const insertRecipie = async (req, res) => {
  try {
    const { title, instructions, ingredients } = req.body;
    const newRecipie = new Recipee({
      title,
      ingredients,
      instructions,
    });
    await newRecipie.save();
    return res
      .status(201)
      .json({ message: `Successfully inserted new title ${title}` });
  } catch (error) {
    console.error("Error inserting recipe:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteRecipie = async (req, res) => {
  try {
    const id = req.params.id; // Get the recipe ID from the request parameters
    const result = await Recipee.findByIdAndDelete(id); // Use findByIdAndDelete to delete by ID
    if (result) {
      return res.status(202).json({ message: "Successfully Deleted" });
    } else {
      return res.status(404).json({ message: "Recipe not found" }); // Handle the case where the recipe doesn't exist
    }
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const editRecipies = async (req, res) => {
  const id = req.params.id;
  const { field, indx, newValue } = req.body;

  try {
    let update = {};

    // Handle updating different fields.
    if (field === "title") {
      update.title = newValue;
    } else if (field === "ingredient" && indx !== undefined) {
      update = { $set: { [`ingredients.${indx}`]: newValue } };
    } else if (field === "instruction" && indx !== undefined) {
      update = { $set: { [`instructions.${indx}`]: newValue } };
    } else {
      return res.status(400).json({ message: "Invalid update field or index" });
    }

    // Perform the update operation.
    const updatedRecipe = await Recipee.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res
      .status(201)
      .json({ message: "Successfully Edited", updatedRecipe });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export { getAllRecipie, insertRecipie, deleteRecipie, editRecipies };
