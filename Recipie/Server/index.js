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

app.delete("/api/recipie/delrecipie/:id", (req, res) => {
  const id = Number(req.params.id);
  const recipeee = recipiee.filter((r) => r.id !== id);
  const findIndexx = recipiee.findIndex((r) => r.id === id);
  // recipiee.splice(findIndexx, 1); can also delete like this
  if (findIndexx == -1) {
    return res.json({ message: `Not found Recipiee with ${id}` });
  }
  fs.writeFile("./Recipie.json", JSON.stringify(recipeee, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving recipe" });
    }
    return res.status(201).json({ message: "Recipe Deleted successfully" });
  });
});
app.patch("/api/recipie/editrecipie/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, ingredients, ingredientIndex, newIngredient } = req.body;

  // Find the index of the recipe to be updated
  const recipeIndex = recipiee.findIndex((r) => r.id === id);

  // If recipe not found, return a 404 response
  if (recipeIndex === -1) {
    return res.status(404).json({ message: `Recipe with ID ${id} not found.` });
  }

  // Update the title if a new title is provided
  if (title) {
    recipiee[recipeIndex].title = title;
  }

  // Update a specific ingredient if `ingredientIndex` and `newIngredient` are provided
  if (typeof ingredientIndex === "number" && newIngredient) {
    recipiee[recipeIndex].ingredients[ingredientIndex] = newIngredient;
  }

  // Update the ingredients if a new list of ingredients is provided
  if (ingredients) {
    recipiee[recipeIndex].ingredients = ingredients;
  }

  // Save the updated recipes back to the JSON file
  fs.writeFile("./Recipie.json", JSON.stringify(recipiee, null, 2), (err) => {
    if (err) {
      console.error("Error saving the updated recipe:", err);
      return res.status(500).json({ message: "Error saving recipe." });
    }
    return res.status(200).json({
      message: "Recipe updated successfully.",
      updatedRecipe: recipiee[recipeIndex],
    });
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
