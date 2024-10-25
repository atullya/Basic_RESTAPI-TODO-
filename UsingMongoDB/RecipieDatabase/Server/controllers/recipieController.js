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
    return res.status(201).json({ message: `Successfully inserted new title ${title}` });
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

export { getAllRecipie, insertRecipie, deleteRecipie };
