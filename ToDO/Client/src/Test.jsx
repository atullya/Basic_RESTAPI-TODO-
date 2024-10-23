import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // State for backend data
  let [backendData, setbackendData] = useState([]);

  // State for form data
  let [formData, setformData] = useState({
    name: "",
    address: "",
    contact: "",
  });

  // State for users
  let [user, setuser] = useState([]);

  // Function to fetch data from backend
  let getData = async () => {
    let response = await fetch("http://localhost:3001/");
    let allresp = await response.json();
    console.log(allresp);
    setbackendData(allresp);
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Function to insert data
  let insertData = async (formData) => {
    // Pass formData as a parameter
    try {
      let res = await fetch("http://localhost:3001/getdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Correctly set the content type
        },
        body: JSON.stringify({ ...formData, id: backendData.length + 1 }), // Corrected syntax
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await res.json(); // Parse the response data if necessary
      console.log("Data inserted:", data); // Log the response data
      getData(); // Fetch the updated data from the server after inserting
    } catch (error) {
      console.error("Error inserting data:", error); // Handle any errors
    }
  };

  // Handle input changes
  let handleInput = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setuser((prevUsers) => {
      const updatedUsers = [...prevUsers, formData];
      console.log("Form Submitted:", updatedUsers); // Log updated user list
      return updatedUsers; // Return the new state
    });

    insertData(formData); // Call insertData with formData

    // Reset form data
    setformData({
      name: "",
      address: "",
      contact: "",
    });
  };

  let DeleteRequest = async (id) => {
    try {
      let res = await fetch(`http://localhost:3001/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete data");
      }

      console.log(`Data with id ${id} deleted successfully`);

      // Fetch the updated data from the server after deletion
      getData();
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  // Handle the delete action
  let handleDelete = (id) => {
    DeleteRequest(id);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        Name:{" "}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInput}
        />
        <br />
        Address:{" "}
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInput}
        />
        <br />
        Contact:{" "}
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleInput}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {backendData?.length > 0
        ? backendData.map((v, i) => {
            return (
              <div key={i}>
                <p>{v.name}</p>
                <p>{v.address}</p>
                <p>{v.contact}</p>
                <button
                  onClick={() => {
                    handleDelete(v.id);
                  }}
                >
                  Delete
                </button>
                <br />
              </div>
            );
          })
        : "No Data Found"}
    </>
  );
}

export default App;
