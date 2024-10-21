const express = require("express");
const app = express();
const fs = require("fs");

const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to get all ToDo items
app.get("/", (req, res) => {
  fs.readFile("./ToDo.json", "utf-8", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(501).json({ message: "Unable to read file" });
    }
    if (result) {
      const data = JSON.parse(result);
      res.json(data);
    } else {
      res.json([]);
    }
  });
});

// Route to add a new ToDo item
app.post("/addToDo", (req, res) => {
  const { id, message, completed } = req.body;

  if (message) {
    fs.readFile("./ToDo.json", "utf-8", (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error reading existing data.");
      }

      let jsonData = [];
      if (result) {
        try {
          jsonData = JSON.parse(result); // Parse existing data
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          return res.status(500).send("Error parsing existing data.");
        }
      }

      // Add the new ToDo item to the array
      jsonData.push({ id, message, completed });

      // Write the updated array back to the file
      fs.writeFile(
        "./ToDo.json",
        JSON.stringify(jsonData, null, 2),
        (writeError) => {
          if (writeError) {
            console.error("Error writing file:", writeError);
            return res.status(500).send("Error saving data.");
          }

          // Send a success response after writing
          res.status(201).json({
            message: "ToDo item added successfully",
            data: { id, message, completed },
          });
        }
      );
    });
  } else {
    res.status(400).send("Message is required.");
  }
});

//delete
app.delete("/deletetodo/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./ToDo.json", "utf-8", (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      try {
        let jsonData = JSON.parse(result);
        const itemIndex = jsonData.findIndex((el) => el.id === parseInt(id));

        if (itemIndex === -1) {
          return res.status(404).send(`No data found with id: ${id}`);
        }
        const newToDoList = jsonData.filter((el) => el.id !== parseInt(id));
        fs.writeFile(
          "./ToDo.json",
          JSON.stringify(newToDoList, null, 2),
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
      console.log("No Data Found");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port no ${PORT}`);
});
