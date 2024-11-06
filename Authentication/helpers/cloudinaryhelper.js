const cloudinary = require("../config/cloudinary.js");
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.log("Error while uploading to cloudinary ", error);
    throw new Error("Error while uploading to cloudinary");
  }
};
module.exports = uploadToCloudinary;
