import React, { useState } from "react";
import "./AddNewContact.css"; // Import the CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function AddNewContact({ getData }) {
  const [modal, setModal] = useState(false);
  //   const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all fields.");
      return;
    }

    // You can add more specific validation for phone and email formats if needed

    insertIntoDatabase();
    setFormData({
      name: "",
      email: "",
      phone: "",
    });

    setModal(false); // Close the modal after submission
  };

  let insertIntoDatabase = async () => {
    try {
      let res = await axios.post("/api/contacts", {
        name: formData.name, // Use formData instead of userData
        phone: formData.phone,
        email: formData.email,
      });
      if (res.status === 201 || res.status === 200) {
        toast.success("Successfully Inserted!");
      }

      getData();
    } catch (error) {
      // Check if the error is an Axios error and if a response is available
      if (error.response && error.response.data) {
        // Extract the message from the response data
        const errorMessage = error.response.data.message;
        console.log("Error message:", errorMessage);
        toast.error(errorMessage); // Display the error message using a toast or alert
      } else {
        // For other types of errors, log a general message
        console.log("An error occurred:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="add-contact-container">
      <button className="back-button" onClick={() => setModal(true)}>
        Add to Contacts
      </button>

      {/* Modal overlay */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <h1>Add New Contact</h1>
            {error && <p className="error-message">{error}</p>}
            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="form-label">
                Name:
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="form-input"
                  name="name"
                  value={formData.name}
                  onChange={handleInput}
                />
              </label>
              <label className="form-label">
                Phone:
                <input
                  type="text"
                  placeholder="Enter Your Phone"
                  className="form-input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInput}
                />
              </label>
              <label className="form-label">
                Email:
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="form-input"
                  name="email"
                  value={formData.email}
                  onChange={handleInput}
                />
              </label>
              <button type="submit" className="submit-button">
                Submit
              </button>
              <button
                type="button"
                className="close-button"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
