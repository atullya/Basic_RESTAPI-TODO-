import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [allrecipie, setallrecipie] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [storeingridents, setstoreingridents] = useState([]);
  const [countingridents, setcoutingridents] = useState(0);
  const [storeinstructions, setstoreinstructions] = useState([]);
  const [countinstructions, setcountinstructions] = useState(0);
  const [ingridentValue, setingridentValue] = useState("");
  const [instructionValue, setinstructionValue] = useState("");
  const [title, settitle] = useState("");

  const getAllRecipie = async () => {
    try {
      setloading(true);
      let res = await axios.get(
        "http://localhost:3001/api/recipiee/allrecipie"
      );
      console.log(res.data);
      setallrecipie(res.data);
    } catch (error) {
      seterror(true);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  const handleIntridents = (e) => {
    e.preventDefault();
    if (ingridentValue.trim() === "") {
      alert("Ingredient can't be empty");
      return;
    }
    setcoutingridents(countingridents + 1);
    setstoreingridents((prevValue) => [...prevValue, ingridentValue]);
    setingridentValue(""); // Clear the input after adding
  };

  const handleInstructions = (e) => {
    e.preventDefault();
    setcountinstructions(countinstructions + 1);
    setstoreinstructions((prevValue) => [...prevValue, instructionValue]);
    setinstructionValue(""); // Clear the input after adding
  };

  const insertRecipieToDatabase = async () => {
    try {
      let res = await axios.post(
        "http://localhost:3001/api/recipiee/insertRecipie",
        {
          title,
          ingredients: storeingridents,
          instructions: storeinstructions,
        }
      );

      if (res.status === 201) {
        alert("Successful");
        getAllRecipie(); // Fetch updated recipes after insertion
      } else {
        alert("Failed to insert recipe. Status code: " + res.status);
      }
    } catch (error) {
      console.error("Error inserting recipe:", error.message || error);
      alert("An error occurred while inserting the recipe.");
    }
  };

  const handleRecipieSubmit = (e) => {
    e.preventDefault();
    insertRecipieToDatabase();
    settitle("");
    setstoreingridents([]); // Clear ingredients after submission
    setstoreinstructions([]); // Clear instructions after submission
    setcountinstructions(0);
    setcoutingridents(0);
  };

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:3001/api/recipiee/deleteRecipie/${id}`
      );
      if (res.status === 202) {
        alert("Delete Successful");
        getAllRecipie(); // Fetch updated recipes after deletion
      }
    } catch (error) {
      console.log("Error deleting recipe:", error);
    }
  };

  useEffect(() => {
    getAllRecipie();
  }, []);

  return (
    <>
      <form onSubmit={handleRecipieSubmit} className="recipe-form">
        Recipe Title:{" "}
        <input
          type="text"
          placeholder="Enter Title"
          onChange={(e) => settitle(e.target.value)}
          value={title}
          className="recipe-input"
        />
        <br />
        Ingredients:{" "}
        <input
          type="text"
          placeholder={`Enter ${countingridents + 1} ingredient `}
          onChange={(e) => setingridentValue(e.target.value)}
          value={ingridentValue}
          className="recipe-input"
        />{" "}
        <button
          onClick={(e) => {
            handleIntridents(e);
          }}
          className="add-button"
        >
          Add
        </button>
        <br />
        Instructions:{" "}
        <input
          type="text"
          placeholder={`Enter ${countinstructions + 1} instruction `}
          onChange={(e) => setinstructionValue(e.target.value)}
          value={instructionValue}
          className="recipe-input"
        />{" "}
        <button
          onClick={(e) => {
            handleInstructions(e);
          }}
          className="add-button"
        >
          Add
        </button>
        <br />
        <button type="submit" className="submit-button">
          Add new Recipe
        </button>
      </form>
      {loading && <h1 className="loading">Loading....</h1>}
      {error && <h1 className="error">Something Went Wrong.....</h1>}
      {!loading && !error && allrecipie.length > 0 ? (
        <div className="recipe-container">
          {allrecipie.map((item, i) => (
            <div className="recipe-card" key={item._id}>
              {" "}
              {/* Use unique ID as key */}
              <h2 className="recipe-title">{item.title}</h2>
              <h3 className="recipe-subtitle">Ingredients:</h3>
              <ul className="ingredient-list">
                {item.ingredients.map((v, indx) => (
                  <li key={indx} className="ingredient-item">
                    {v}
                  </li>
                ))}
              </ul>
              <h3 className="recipe-subtitle">Instructions:</h3>
              <ol className="instruction-list">
                {item.instructions.map((inst, indxx) => (
                  <li key={indxx} className="instruction-item">
                    {inst}
                  </li>
                ))}
              </ol>
              <button onClick={() => handleDelete(item._id)}>Delete</button>{" "}
              {/* Use arrow function here */}
            </div>
          ))}
        </div>
      ) : (
        <h2 className="no-results">No Results Found</h2>
      )}
    </>
  );
}

export default App;
