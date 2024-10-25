// Controllers/todoController.js
// import ToDo from "../models/todoModel.js"; // Ensure this path is correct

import ToDo from "../models/todoModel.js";

const todoController = async (req, res) => {
  try {
    const allTodos = await ToDo.find(); // Await the promise
    res.status(200).json(allTodos); // Send the todos as JSON
  } catch (error) {
    console.error(`Error fetching todos: ${error.message}`);
    res.status(500).json({ message: "Server Error" }); // Handle errors
  }
};

const inserttodoController = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    const newTodo = new ToDo({
      title,
      completed: false, // Default value for 'completed'
    });
    await newTodo.save();

    // Return success response with the created todo
    return res
      .status(201)
      .json({ message: "Successfully Created", todo: newTodo });
  } catch (error) {
    console.log("Error");
  }
};

const deletetodo = async (req, res) => {
  try {
    const id = req.params.id; // Get the id from the URL parameters

    // Use Mongoose's findByIdAndDelete to delete the todo by its _id
    const deletedTodo = await ToDo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Return a success response
    return res
      .status(200)
      .json({ message: "Todo successfully deleted", deletedTodo });
  } catch (error) {
    console.error(`Error deleting todo: ${error.message}`);
    return res.status(500).json({ message: "Server error" });
  }
};

const editToDos = async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const editedToDo = await ToDo.findByIdAndUpdate(id, {title:title}, { new: true });
    if (!editedToDo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo Edited Successfully" });
  } catch (error) {
    console.error(`Error deleting todo: ${error.message}`);
    return res.status(500).json({ message: "Server error" });
  }
};

export { todoController, inserttodoController, deletetodo,editToDos };
