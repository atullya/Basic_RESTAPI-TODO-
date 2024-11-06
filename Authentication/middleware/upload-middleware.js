const multer = require("multer");
const path = require("path");

// Set multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {  // Fix "destiantion" typo
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Filter function
const checkfileFilter = (req, file, cb) => {  // Make sure to include "file" parameter
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an Image! Please upload an image"));
  }
};

// Export multer middleware
module.exports = multer({
  storage: storage,
  fileFilter: checkfileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});
