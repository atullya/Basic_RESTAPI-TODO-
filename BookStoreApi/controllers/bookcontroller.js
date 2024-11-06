const bookmodel = require("../models/bookmodel");

// const Book = require("../models/bookmodel.js");
const getAllBooks = async (req, res) => {
  try {
    const allBook = await bookmodel.find({});
    if (allBook.length > 0) {
      return res.status(200).json({
        success: true,
        message: "List of book fetched successfully",
        data: allBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books found in the database",
      });
    }
  } catch (error) {
    console.log("Error comings");
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};
const getSingleBookByID = async (req, res) => {
  try {
    const getCurrentId = req.params.id;
    const bookDetailsById = await bookmodel.findById(getCurrentId);
    if (!bookDetailsById) {
      return res.status(404).json({
        success: false,
        message: "No books found in the current ID",
      });
    }
    res.status(200).json({
      success: true,
      data: bookDetailsById,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};
const addNewBook = async (req, res) => {
  try {
    const newBookFormData = req.body;

    const newlyCreateBook = await bookmodel.create(newBookFormData);
    if (newBookFormData) {
      return res.status(201).json({
        success: true,
        message: "book added",
        data: newlyCreateBook,
      });
    }
  } catch (error) {
    console.log("Server Error");
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};
const updateBook = async (req, res) => {
    try{
        const updateBookFormData=req.body;
        const getCurrentBookId=req.params.id;
        const updatedBook=await bookmodel.findByIdAndUpdate(getCurrentBookId,updateBookFormData,{
            new:true
        });
        if (!updatedBook) {
            return res.status(404).json({
              success: false,
              message: "No books found in the current ID",
            });
          }
          res.status(200).json({
            success: true,
            data: updatedBook,
          });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong please try again",
          });
    
    }
};
const deleteBook = async (req, res) => {
    try{
        const getCurrentID=req.params.id;
        const deletedBook=await bookmodel.findByIdAndDelete(getCurrentID)
        if (!deletedBook) {
            return res.status(404).json({
              success: false,
              message: "No books found in the current ID",
            });
          }
          res.status(200).json({
            success: true,
            data: deletedBook,
          });
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong please try again",
          });
    }
};
module.exports = {
  getAllBooks,
  getSingleBookByID,
  addNewBook,
  updateBook,
  deleteBook,
};
