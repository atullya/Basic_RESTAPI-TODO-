import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [todoInput, setTodoInput] = useState("");


  const getToDo = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("http://localhost:3000/api/todos/gettodo");
      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await res.json();
      setAllTodos(data);
    } catch (error) {
      setError(true);
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToDoToDatabase = async () => {
    try {
      let res = await fetch("http://localhost:3000/api/todos/inserttodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: todoInput }),
      });
      if (res.ok) {
        setTodoInput(""); // Clear the input field after successful addition
        getToDo(); // Refresh the list after adding
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteToDofromDatabase = async (id) => {
    try {
      let res = await fetch(
        `http://localhost:3000/api/todos/deletetodo/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        getToDo(); // Refresh the list after deletion
      }
    } catch (error) {
      alert("Failed to add todo");
      console.log(error);
    }
  };

  let editToDoFromDatabase = async (id) => {
    let newToDo = prompt("Enter New To Do...");
    // let upDateToDo = allTodos.map((todo) =>
    //   todo._id === id ? { ...todo, title: newToDo } : todo
    // );

    // setAllTodos(upDateToDo);
    try {
      let res = await fetch(`http://localhost:3000/api/todos/editToDo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newToDo }),
      });
      if (res.ok) {
        getToDo(); // Refresh the list to reflect the changes
      }
    } catch (error) {
      console.log(error);
    }
  };
  let addToDo = () => {
    if (allTodos.length >= 4) {
      alert("You can't add more to-dos now");
      return; // Exit the function without adding a new to-do
    }

    

    addToDoToDatabase();
    if (todoInput === "") {
      alert("Todo can't be empty");
    }
  };

  useEffect(() => {
    getToDo();
  }, []); // Runs once on mount

  let handleToggle = (id) => {
    const updatedTodos = allTodos.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setAllTodos(updatedTodos); // Update the state with the toggled todos
  };

  return (
    <div className="App">
      <h1 className="app-title">To-Do Manager</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addToDo();
        }}
        className="todo-form"
      >
        <input
          type="text"
          placeholder="Enter a new todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          className="todo-input"
        />
        <button className="add-todo-btn">Add ToDo</button>
      </form>

      {loading && <h2 className="loading-text">Loading...</h2>}
      {error && <h2 className="error-text">Something went wrong...</h2>}

      <div className="todos-container">
        {!loading && !error && allTodos.length > 0
          ? allTodos.map((todo) => (
              <div key={todo._id} className="todo-card">
                <input
                  type="checkbox"
                  onChange={() => handleToggle(todo._id)}
                  checked={todo.completed} // This ensures the checkbox state aligns with the toggle state for this specific todo
                />
                {todo.completed ? (
                  <del className="todo-title">{todo.title}</del>
                ) : (
                  <p className="todo-title">{todo.title}</p>
                )}
                {/* <p className="todo-title">{todo.title}</p> */}

                <button
                  className="edit-btn"
                  onClick={() => editToDoFromDatabase(todo._id)}
                >
                  Edit
                </button>
                {todo.completed ? (
                  <button
                    className="delete-btn"
                    onClick={() => deleteToDofromDatabase(todo._id)}
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))
          : !loading &&
            !error && <p className="no-todos-text">No todos available</p>}
      </div>
      <footer className="footer-text">Total Todos: {allTodos.length}</footer>
    </div>
  );
}

export default App;
