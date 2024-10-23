const express = require("express");
const app = express(); // Initialize the app
const fs = require("fs");

const PORT = 3001;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// GET route
app.get("/", (req, res) => {
  fs.readFile("./dummy.json", "utf-8", (err, result) => {
    if (err) {
      console.log("Error reading file:", err);
      return res.status(500).send("Error reading data.");
    }
    try {
      const data = JSON.parse(result); // Parse the JSON string into an object
      res.json(data); // Send the JSON object as the response
    } catch (parseError) {
      console.log("Error parsing JSON:", parseError);
      res.status(500).json({ message: "Error parsing JSON" }); // Handle parsing error
    }
  });
});

// POST route
app.post("/getdata", (req, res) => {
  console.log("Received data:", req.body); // Log incoming data

  const { name, address, contact, id } = req.body; // Destructure properties from request body

  if (name && address && contact) {
    console.log(name);
    console.log(address);
    console.log(contact);

    // Read existing data from dummy.json
    fs.readFile("./dummy.json", "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Error saving data.");
      }

      let jsonData = [];
      if (data) {
        try {
          jsonData = JSON.parse(data); // Parse existing data
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          return res.status(500).send("Error parsing existing data.");
        }
      }

      // Append new entry to the existing data
      jsonData.push({ name, address, contact, id });

      // Write updated data back to dummy.json
      fs.writeFile(
        "./dummy.json",
        JSON.stringify(jsonData, null, 2),
        (writeErr) => {
          if (writeErr) {
            console.error("Error writing file:", writeErr);
            return res.status(500).send("Error saving data.");
          }

          res.send(`Received name: ${name}`); // Responding to the client
        }
      );
    });
  } else {
    res.status(400).send("Name, address, and contact are required."); // Sending an error response if any required field is missing
  }
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params; // Extract the 'id' from the request parameters

  fs.readFile("./dummy.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Error Happening!!");
      return res.status(500).send("Error reading data.");
    }

    if (data) {
      try {
        // Parse the existing JSON data
        let jsonData = JSON.parse(data);

        // Check if an item with the given 'id' exists

        // Filter out the entry with the matching 'id'
        let newData = jsonData.filter((el) => el.id !== parseInt(id));

        // Write the updated data back to 'dummy.json'
        fs.writeFile(
          "./dummy.json",
          JSON.stringify(newData, null, 2),
          (writeErr) => {
            if (writeErr) {
              console.error("Error writing file:", writeErr);
              return res.status(500).send("Error saving data.");
            }

            res.send("Data successfully deleted.");
          }
        );
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        res.status(500).send("Error parsing data.");
      }
    } else {
      res.status(404).send("No data found.");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running on PORT no ${PORT}`);
});
