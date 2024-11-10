import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllContact.css"; // Import the CSS file
import AddNewContact from "./AddNewContact/AddNewContact";
import { toast } from "react-toastify";

export default function AllContact() {
  const [allcontacts, setAllContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newValues, setNewValues] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [sortby, setsortby] = useState(""); // State for sorting
  const [orderby, setorderby] = useState(""); // State for sorting

  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1

  const getData = async (query = "", page = 1, sort = "", order = "") => {
    try {
      setLoading(true);
      setError(false);
      let res = await axios.get(
        `/api/contacts?name=${query}&page=${page}&sort=${sort}&order=${order}`
      );
      setAllContacts(res.data.contacts);
      setPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log("Error occurred:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteContact = async (id) => {
    try {
      let res = await axios.delete(`/api/contacts/${id}`);
      if (res.status === 200 || res.status === 204) {
        toast.success("Successfully deleted a record");
      }
      getData(searchQuery, currentPage); // Refresh data after deleting
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.log("Error message:", errorMessage);
        toast.error(errorMessage);
      } else {
        console.log("An error occurred:", error.message);
        toast.error("Failed to delete the contact. Please try again.");
      }
    }
  };

  const editContact = async (id) => {
    try {
      let res = await axios.patch(`/api/contacts/${id}`, newValues);
      if (res.status === 200) {
        toast.success("Contact updated successfully!");
        setEditingId(null); // Exit editing mode after success
        getData(searchQuery, currentPage); // Refresh data after updating
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update contact. Please try again.");
    }
  };

  const handleEdit = (e, field) => {
    setNewValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const startEditing = (id, currentName, currentPhone, currentEmail) => {
    setEditingId(id); // Set the ID of the contact being edited
    setNewValues({
      name: currentName,
      phone: currentPhone,
      email: currentEmail,
    }); // Set the current values in the input fields
  };

  const filteredContacts = allcontacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= pages) {
      setCurrentPage(page);
      getData(searchQuery, page);
    }
  };
  const handleSorting = (e) => {
    if (e.target.name === "sortby") {
      setsortby(e.target.value); // Update sorting criteria
    } else if (e.target.name === "order") {
      setorderby(e.target.value); // Update sorting order
    }
    getData(searchQuery, 1, sortby, orderby); // Pass all necessary parameters
  };
  return (
    <>
      <AddNewContact getData={getData} />
      <div className="container">
        <div className="sorting">
          <h2>Sort By</h2>
          <select name="sortby" id="" onChange={handleSorting}>
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>

          <h2>Order</h2>
          <select name="order" id="" onChange={handleSorting}>
            <option value="">Order</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <h1>Contact List</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            getData(e.target.value, 1); // Reset to page 1 on search
          }}
          className="search-input"
        />
        {loading && <h1 className="loading">Loading.....</h1>}
        {error && <h1 className="error">Something Went Wrong</h1>}
        <div className="contacts-container">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <div key={index} className="contact-item">
                <button
                  className="close-button"
                  onClick={() => deleteContact(contact._id)}
                >
                  &times;
                </button>
                <div className="contact-info">
                  <strong>Name:</strong>{" "}
                  {editingId === contact._id ? (
                    <input
                      type="text"
                      value={newValues.name}
                      onChange={(e) => handleEdit(e, "name")}
                      onBlur={() => editContact(contact._id)}
                    />
                  ) : (
                    <>
                      {contact.name}
                      <button
                        onClick={() =>
                          startEditing(
                            contact._id,
                            contact.name,
                            contact.phone,
                            contact.email
                          )
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
                <div className="contact-info">
                  <strong>Phone:</strong>{" "}
                  {editingId === contact._id ? (
                    <input
                      type="text"
                      value={newValues.phone}
                      onChange={(e) => handleEdit(e, "phone")}
                      onBlur={() => editContact(contact._id)}
                    />
                  ) : (
                    <>
                      {contact.phone}
                      <button
                        onClick={() =>
                          startEditing(
                            contact._id,
                            contact.name,
                            contact.phone,
                            contact.email
                          )
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
                <div className="contact-info">
                  <strong>Email:</strong>{" "}
                  {editingId === contact._id ? (
                    <input
                      type="text"
                      value={newValues.email}
                      onChange={(e) => handleEdit(e, "email")}
                      onBlur={() => editContact(contact._id)}
                    />
                  ) : (
                    <>
                      {contact.email}
                      <button
                        onClick={() =>
                          startEditing(
                            contact._id,
                            contact.name,
                            contact.phone,
                            contact.email
                          )
                        }
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No contacts available.</p>
          )}
        </div>
        <p className="total-contacts">
          Total Contacts: {filteredContacts.length}
          <br />
          Total Pages: {pages}
          <br />
          Current Page: {currentPage}
        </p>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {pages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
