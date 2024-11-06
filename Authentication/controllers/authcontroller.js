const User = require("../models/usermodel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//register controller

const registerUser = async (req, res) => {
  try {
    //extract user information from our request body
    const { username, email, password, role } = req.body;
    console.log(username);
    //if the user is already exist in our database
    const checkExistingUser = await User.findOne({
      $or: [{ username, email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists either with same username or same email. Please try again with different username or email",
      });
    }
    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user and save in a database
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword, // Rename hashedPassword to password here
      role: role || "user",
    });
    await newlyCreatedUser.save();
    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: "User Registed Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to  register user please try again",
      });
    }
    //   // Create a new user and save it in the database using `create` method
    //   const newlyCreatedUser = await User.create({
    //     username,
    //     email,
    //     password: hashedPassword, // save hashed password as 'password'
    //     role: role || 'user',
    //   });
  } catch (error) {
    console.log("Error");
    res.status(500).json({
      sucess: false,
      messsage: "Some error occur please try again",
    });
  }
};

//login controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //find if the current user is exists in database or not
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists!",
      });
    }
    //if the password is correct or not
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Username!",
      });
    }
    //create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({
      success: true,
      message: "Loggedin successfull",
      accessToken,
    });
  } catch (error) {
    console.log("Error");
    res.status(500).json({
      sucess: false,
      messsage: "Some error occur please try again",
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    //extract old and new password
    const { oldPassword, newPassword } = req.body;
    //find the current logged in user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!!",
      });
    }
    //check if the old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old Password in not correct. Please try again!!",
      });
    }
    //hash the new password here
    const salt = await bcrypt.genSalt(10);
    const newHashPassword = await bcrypt.hash(newPassword, salt);
    //update user password
    user.password = newHashPassword;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully Changed password" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      messsage: "Some error occur please try again",
    });
  }
};
module.exports = { registerUser, loginUser, changePassword };
