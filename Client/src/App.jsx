import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, settodos] = useState([]);
  let [todoitem, settodoitem] = useState("");

  // Function to fetch data from the backend
  let getTodo = async () => {
    try {
      let res = await fetch("http://localhost:3001/");
      let reqdata = await res.json();
      console.log(reqdata);
      settodos(reqdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getTodo();
  }, []);

  // Function to add a new to-do item
  let insertData = async (todoitem) => {
    try {
      let res = await fetch("http://localhost:3001/addToDo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: todoitem, // Wrap the todo item in an object
          id: todos.length + 1,
          completed: false,
        }),
      });

      if (!res.ok) {
        throw new Error("Error Happening");
      }

      getTodo(); // Refresh the to-do list after insertion
    } catch (error) {
      console.log("Error inserting data:", error);
    }
  };

  let deleteToDo = async (id) => {
    let res = await fetch(`http://localhost:3001/deletetodo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    if (!res.ok) {
      console.log("error");
    }
    console.log(`Data with id ${id} deleted successfully`);

    // Fetch the updated data from the server after deletion
    getTodo();
  };
  //delete
  let handleDelete = (id) => {
    deleteToDo(id);
  };
  // Handle the form submission to add a new to-do item
  let handleToDo = (e) => {
    if (todoitem.trim() === "") {
      alert("To-Do item cannot be empty");
      return;
    }

    insertData(todoitem); // Add the to-do item
    settodoitem(""); // Clear the input field
  };

  // Handle input changes
  let handleChange = (e) => {
    settodoitem(e.target.value);
  };

  let handleEdit = (id) => {
    let updateTodo = prompt("Edit your to do now");

    let newedittodo = todos.map((todo) =>
      todo.id === id ? { ...todo, message: updateTodo } : todo
    );
    settodos(newedittodo);
    // settodos((prev) =>
    //   prev.map((todo) =>
    //     todo.id === id ? { ...todo, message: updateTodo } : todo
    //   )
    // );
  };

  return (
    <>
      <h1>To Do List</h1>
      <input
        type="text"
        name="todo"
        placeholder="Add ToDo"
        value={todoitem}
        onChange={handleChange}
      />
      <button onClick={handleToDo}>Add To DO</button>
      {todos?.length > 0
        ? todos.map((v, i) => {
            return (
              <div key={i}>
                <li>
                  {v.message}{" "}
                  <button
                    onClick={() => {
                      handleDelete(v.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleEdit(v.id);
                    }}
                  >
                    Edit
                  </button>
                </li>
              </div>
            );
          })
        : "No Data Found"}
    </>
  );
}

export default App;
