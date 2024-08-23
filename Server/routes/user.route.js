const express = require("express");
const {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
} = require("../controller/user.controller");
const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/forgetPassword", forgetPassword)
  .post('/reset-password/:resetToken',resetPassword);

module.exports = router;
