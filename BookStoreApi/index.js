require("dotenv").config();
const express = require("express");
const connecttoDB = require("./database/db.js");

const app = express();
const bookRoutes = require("./routes/bookroutes.js");

const PORT = process.env.PORT || 3000;

//CONNECT TO DB
connecttoDB();

//middle ->express.json();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes here
app.use("/api/books", bookRoutes);
app.get("/", (req, res) => {
  return res.send("Helloasdfhadosklhf");
});

app.listen(PORT, () => {
  console.log(`Server starting on ${PORT}`);
});
