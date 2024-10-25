// Routes/todoRoutes.js
import express from "express";
import {
  todoController,
  inserttodoController,
  deletetodo,
  editToDos,
} from "../Controllers/todoController.js"; // Use ES6 imports

const router = express.Router();

// Define a route for getting todos
router.get("/gettodo", todoController);

router.post("/inserttodo", inserttodoController);

router.delete("/deletetodo/:id", deletetodo);
router.patch("/editToDo/:id",editToDos)

export default router; // Use ES6 export
