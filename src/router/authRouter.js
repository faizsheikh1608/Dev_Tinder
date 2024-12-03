const express = require("express");
const { validateSignup } = require("../utils/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

//SignUp
authRouter.post("/signup", async (req, res) => {
  //Validating Data
  validateSignup(req);

  const { firstName, lastName, email, password } = req.body;
  //Encrypting Password
  const encryptPassword = await bcrypt.hash(password, 10);

  //creating new instance of user model
  const user = new User({
    firstName,
    lastName,
    email,
    password: encryptPassword,
  });

  try {
    //Saving data in database
    await user.save();
    res.send("Data save Succesfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (isPassValid) {
      const token = jwt.sign({ _id: user._id }, "Faiz@123");

      res.cookie("token", token);
      res.send("Login Successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull!");
});

module.exports = authRouter;
