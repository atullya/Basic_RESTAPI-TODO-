import Contact from "../models/contactModel.js";





const allContact = async (req, res) => {
  try {
    const { page = 1, limit = 4, sort, order } = req.query; // Get pagination and sorting parameters
    let query = {}; // Create an empty query object

    // Determine the sorting order: ascending (1) or descending (-1)
    const sortOptions = {};
    if (sort) {
      sortOptions[sort] = order === 'desc' ? -1 : 1; // Use -1 for descending, 1 for ascending
    }

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate the starting index for the current page
    const startIndex = (pageNumber - 1) * limitNumber;

    // Fetch contacts based on the query, sorting, and pagination
    const contacts = await Contact.find(query)
      .sort(sortOptions) // Apply sorting
      .skip(startIndex) // Skip to the start index
      .limit(limitNumber); // Limit to the number of contacts per page

    // Get total count of contacts for pagination
    const totalContacts = await Contact.countDocuments(query);

    // Create a response object
    const response = {
      totalContacts,
      totalPages: Math.ceil(totalContacts / limitNumber),
      currentPage: pageNumber,
      contacts, // Current page contacts
    };

    res.status(200).json(response); // Return the response
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};


const createContact = async (req, res) => {
  const { name, phone, email } = req.body;

  try {
    // Check if a contact with the same email already exists
    const existingContact = await Contact.findOne({ email });

    if (existingContact) {
      return res
        .status(400)
        .json({ message: "Person already exists with that email." });
    }

    // Create a new contact if no existing contact is found
    const newContact = new Contact({
      name,
      phone,
      email,
    });

    // Save the new contact to the database
    const saveData = await newContact.save();

    if (saveData) {
      return res
        .status(201)
        .json({ message: "Successfully inserted in Database" });
    }
  } catch (error) {
    console.log("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    let deleteUser = await Contact.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.json({ message: "Not found user with that ID" });
    }
    if (deleteUser) {
      return res.json({ message: "SUccessfully Deleted !" });
    }
  } catch (error) {
    console.log("Server Error");
  }
};
const editContact = async (req, res) => {
  const id = req.params.id; // Get the contact ID from the URL parameters
  const { name, email, phone } = req.body; // Get updated data from the request body

  try {
    // Find the contact by ID and update it
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone }, // Update fields
      { new: true } // Return the updated document
    );

    // Check if the contact was found and updated
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    // Return the updated contact
    res.status(200).json({
      message: "Contact updated successfully.",
      contact: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      message: "Failed to update contact.",
      error: error.message,
    });
  }
};

// const searchUser = async (req, res) => {
//   try {
//     const { name } = req.query;
//     console.log("Search name:", name);

//     let query = {};
//     if (name) {
//       query = {
//         name: { $regex: name, $options: "i" }, // Case-insensitive search for the name.
//       };
//     }

//     // Find contacts based on the query.
//     const contacts = await Contact.find(query);

//     // Send the found contacts as a response.
//     res.status(200).json(contacts);
//   } catch (error) {
//     console.error("Error fetching contacts:", error);
//     res.status(500).json({
//       message: "Failed to fetch contacts",
//       error: error.message,
//     });
//   }
// };
export { allContact, createContact, deleteContact, editContact };
