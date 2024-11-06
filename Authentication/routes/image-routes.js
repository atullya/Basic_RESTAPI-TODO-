const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware.js");
const adminMiddleware = require("../middleware/admin-middleware.js");
const uploadMiddleware = require("../middleware/upload-middleware.js");
const {
  uploadImage,
  fetchImagesController,
  deleteImageController
} = require("../controllers/imagecontroller.js"); // Updated import

// Upload the image
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage // Pass the function itself, not the whole controller object
);

//to get all the iamges
router.get("/get",  authMiddleware,fetchImagesController);


//delete image route
//672b0dcf0acaffd569572379
router.delete('/:id',authMiddleware,adminMiddleware,deleteImageController)
module.exports = router;
