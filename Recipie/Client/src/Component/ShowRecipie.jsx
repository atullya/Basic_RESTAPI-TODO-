import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Showrecipie.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowRecipie() {
  const [recipie, setRecipie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to hold error messages
  const [ingredients, setIngridents] = useState([]);
  const [IngridentsInput, setIngridentsInput] = useState("");
  const [countIngrident, setcountIngrident] = useState(1);
  const [instructions, setInstruction] = useState([]);
  const [InstructionInput, setInstructionINput] = useState("");
  const [countInstruction, setCountInstruction] = useState(1);
  const [title, setTitle] = useState("");
  const getRecipie = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/recipie");
      console.log(res.data);
      setRecipie(res.data.Data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to load recipes. Please try again later."); // Set error message
      console.log("Error", err);
    }
  };

  const addIngrident = (e) => {
    e.preventDefault();
    if (IngridentsInput === "") {
      alert("Please Input Ingrident");
    }
    if (IngridentsInput.trim()) {
      // Prevent adding empty ingredients
      const newIngridents = [...ingredients, IngridentsInput]; // Create a new array with the added ingredient
      setIngridents(newIngridents);
      setcountIngrident((countIngrident) => countIngrident + 1);
      setIngridentsInput(""); // Clear the input field
      console.log(newIngridents); // Log the updated array instead
    }
  };

  const addInstruction = (e) => {
    e.preventDefault();
    if (InstructionInput === "") {
      alert("Please Input Instruction");
    }
    if (InstructionInput.trim()) {
      // Prevent adding empty ingredients
      const newInstruction = [...instructions, InstructionInput]; // Create a new array with the added ingredient
      setInstruction(newInstruction);
      setCountInstruction((countInstruction) => countInstruction + 1);
      setInstructionINput(""); // Clear the input field
      console.log(newInstruction); // Log the updated array instead
    }
  };

  useEffect(() => {
    getRecipie();
  }, []);

  let insertRecipie = async (ingredients, instructions) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/recipie/addrecipie",
        { ingredients, instructions, title }, // Data to send
        {
          headers: {
            "Content-Type": "application/json", // Set content type in headers
          },
        }
      );

      // Check if the response status indicates success (2xx range)
      if (res.status < 200 || res.status >= 300) {
        throw new Error("Unable to insert data");
      }
      getRecipie();

      console.log("Recipe added successfully:", res.data); // Log success response
    } catch (error) {
      console.error("Error inserting recipe:", error); // Log error details
    }
  };

  let deleteRecipie = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:3001/api/recipie/delrecipie/${id}`
      );

      // Check if the response status is successful (200 or 201)
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Unable to delete");
      }

      // Call getRecipie to refresh the list after successful deletion
      getRecipie();

      console.log("Recipe Deleted successfully:", res.data); // Log success response
    } catch (error) {
      console.error("Error deleting recipe:", error.message); // Log the error message for better clarity
    }
  };

  let handleDelete = (id) => {
    deleteRecipie(id);
    toast("Successfully Deleted", {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // Optionally, you can show an alert for user confirmation or feedback
    // alert(`Deleted recipe with ID: ${id}`);
  };
  // Function to edit the title of a recipe
  let editTitle = async (id) => {
    // Prompt the user for the new title
    const newTitle = prompt("Enter the new Title");

    // If the user cancels the prompt or enters an empty string, do nothing
    if (!newTitle) {
      return;
    }

    try {
      // Make a PATCH request to update the recipe title on the server
      const response = await axios.patch(
        `http://localhost:3001/api/recipie/editrecipie/${id}`,
        {
          title: newTitle,
        }
      );

      // If the request is successful, update the local state
      if (response.status === 200 || response.status === 201) {
        let updatedRecipie = recipie.map((recipie) =>
          recipie.id === id ? { ...recipie, title: newTitle } : recipie
        );

        setRecipie(updatedRecipie);
        console.log("Updated Recipes:", updatedRecipie);
        alert("Recipe title updated successfully!");
      } else {
        alert("Failed to update the recipe title.");
      }
    } catch (error) {
      console.error("Error updating recipe title:", error);
      alert("An error occurred while updating the recipe title.");
    }
  };

  // Function to edit an ingredient in a recipe
  let editIngredient = async (recipeId, ingredientIndex) => {
    // Prompt the user for the new ingredient value
    const newIngredient = prompt("Enter the new ingredient");

    // If the user cancels the prompt or enters an empty string, do nothing
    if (!newIngredient) {
      return;
    }

    try {
      // Make a PATCH request to update the specific ingredient on the server
      const response = await axios.patch(
        `http://localhost:3001/api/recipie/editrecipie/${recipeId}`,
        {
          ingredientIndex,
          newIngredient,
        }
      );

      // If the request is successful, update the local state
      if (response.status === 200 || response.status === 201) {
        // Update the recipe list by mapping through each recipe
        let updatedRecipes = recipie.map((recipe) => {
          // If the recipe matches the specified id, update its ingredients
          if (recipe.id === recipeId) {
            // Create a copy of the recipe and update the specific ingredient
            const updatedIngredients = recipe.ingredients.map(
              (ingredient, index) =>
                index === ingredientIndex ? newIngredient : ingredient
            );

            return {
              ...recipe,
              ingredients: updatedIngredients, // Replace the old ingredients with the updated ones
            };
          }

          // Return the recipe unchanged if it doesn't match the id
          return recipe;
        });

        // Update the state with the modified recipe list
        setRecipie(updatedRecipes);

        // Log the updated recipe list for debugging
        console.log("Updated Recipes:", updatedRecipes);
        alert("Ingredient updated successfully!");
      } else {
        alert("Failed to update the ingredient.");
      }
    } catch (error) {
      console.error("Error updating ingredient:", error);
      alert("An error occurred while updating the ingredient.");
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    insertRecipie(ingredients, instructions);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        Recipie Title:{" "}
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        Ingridents:{" "}
        <input
          type="text"
          placeholder={`Enter ${countIngrident} Ingredients`}
          onChange={(e) => setIngridentsInput(e.target.value)}
          value={IngridentsInput}
        />{" "}
        <button onClick={addIngrident}>Add</button>
        <br />
        Instructions:{" "}
        <input
          type="text"
          placeholder={`Enter ${countInstruction} Instruction`}
          value={InstructionInput}
          onChange={(e) => setInstructionINput(e.target.value)}
        />{" "}
        <button onClick={addInstruction}>Add</button>
        <br />
        <button type="submit ">Upload Your Recipie</button>
      </form>
      <h1>Show Recipes</h1>
      {loading && <p>Loading...</p>} {/* Loading indicator */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      {recipie.length > 0 ? (
        <ul>
          {recipie.map((item, index) => (
            <div key={index}>
              <h2>{item.title}</h2>
              <button onClick={() => editTitle(item.id)}>Edit</button>
              <h3>Ingredients:</h3>
              {item.ingredients.map((v, i) => (
                <li key={i}>
                  {v}
                  <button onClick={() => editIngredient(item.id, i)}>
                    Edit
                  </button>
                </li>
              ))}
              <h3>Instructions:</h3>
              <ol start={1}>
                {item.instructions.map((v, i) => (
                  <li key={i}>
                    {v} <button>Edit</button>
                  </li>
                ))}
              </ol>
              <button
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                Delete{" "}
              </button>
            </div>
          ))}
        </ul>
      ) : (
        !loading && <p>No recipes found.</p> // Display message if no recipes
      )}
      <ToastContainer />
    </div>
  );
}
