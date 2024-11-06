const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware.js");
router.get("/welcome", authMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;
  res.json({
    message: "Welcome to home page",
    user: {
      _id: userId,
      username,
      role,
    },
  });
});
module.exports = router;
