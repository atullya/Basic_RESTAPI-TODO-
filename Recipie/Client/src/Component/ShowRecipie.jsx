import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Showrecipie.css"

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
              <h3>Ingredients:</h3>
              {item.ingredients.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
              <h3>Instructions:</h3>
              <ol start={1}>
                {item.instructions.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ol>
            </div>

          ))}
        </ul>
      ) : (
        !loading && <p>No recipes found.</p> // Display message if no recipes
      )}
    </div>
  );
}


