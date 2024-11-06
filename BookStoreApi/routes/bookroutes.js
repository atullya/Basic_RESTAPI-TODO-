const express = require("express");
const {
  getAllBooks,
  getSingleBookByID,
  addNewBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookcontroller");

//express router
const router = express.Router();

//all the routes goes here that are related to book only

router.get("/get", getAllBooks);
router.get("/get/:id", getSingleBookByID);
router.post("/add", addNewBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
