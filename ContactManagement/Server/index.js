import express from "express";
import contactRoutes from "./routes/contactRoutes.js";
import mongoose from "mongoose";
import Contact from "./models/contactModel.js";
const app = express();
const PORT = 3001;
import cors from "cors";
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", contactRoutes);

//Database ko connection code

const DBconnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Contact");
    console.log("Successfully Connected to Database");
    // await insertSomeItem();
  } catch (error) {
    console.log("Error Creating Database");
  }
};
DBconnect();

// let insertSomeItem = async () => {
//   let contact = [
//     {
//       name: "John Doe",
//       phone: "123-456-7890",
//       email: "john@example.com",
//     },
//     {
//       name: "John Smith",
//       phone: "987-654-3210",
//       email: "john.smith@example.com",
//     },
//   ];
//   try {
//     await Contact.insertMany(contact);
//     console.log("Successfully inserted Data in database");
//   } catch (error) {
//     console.log(error);
//   }
// };

app.get("/", (req, res) => {
  res.send("Hello From Home Page");
});
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
