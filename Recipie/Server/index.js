const express = require("express");
const recipiee = require("./Recipie.json");
const app = express();
const fs = require("fs");
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/recipie", (req, res) => {
  fs.readFile("./Recipie.json", "utf-8", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error reading file" }); // Return a 500 error for server issues
    }
    if (result) {
      let JSONData = JSON.parse(result);

      return res.status(200).json({ Data: JSONData }); // Use 200 for a successful response
    }
    return res.status(404).json({ message: "Failed to retrieve Data" }); // Changed to 404 for not found
  });
});

app.get("/ap/recipie/:id", (req, res) => {
  const id = Number(req.params.id); // Convert the id to a number
  const recipeee = recipiee.find((r) => r.id == id);
  const findIndexx = recipiee.findIndex((r) => r.id === id);
  if (findIndexx == -1) {
    return res.json({ message: "Not found user with that id" });
  }
  console.log(recipeee);
  return res.json(recipeee);
  //   fs.readFile("./Recipie.json", "utf-8", (err, result) => {
  //     if (err) {
  //       console.log("error");
  //     }
  //     if (result) {
  //       const JSONData = JSON.parse(result);
  //       const findIndex = JSONData.findIndex((el) => el.id === id); // Find the index using strict equality

  //       if (findIndex === -1) {
  //         return res.status(404).json({ message: "Recipe not found" });
  //       }

  //       const recipe = JSONData[findIndex];
  //       return res.status(200).json(recipe); // Return the found recipe
  //     } else {
  //       return res.status(404).json({ message: "No recipes available" });
  //     }
  //   });
});
app.post("/api/recipie/addrecipie", (req, res) => {
  const { title, ingredients, instructions } = req.body;
  console.log(title);
  if (title) {
    fs.readFile("./Recipie.json", "utf-8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error reading file" });
      }

      const recipes = JSON.parse(data || "[]"); // Parse existing recipes or start with an empty array
      recipes.push({
        title,
        ingredients,
        instructions,
        id: recipes.length + 1,
      }); // Add the new recipe
      fs.writeFile(
        "./Recipie.json",
        JSON.stringify(recipes, null, 2),
        (err) => {
          if (err) {
            return res.status(500).json({ message: "Error saving recipe" });
          }
          return res
            .status(201)
            .json({ message: "Recipe added successfully", recipe: title });
        }
      );
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
