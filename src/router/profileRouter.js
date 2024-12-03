const express = require("express");
const userAuth = require("../middleware/userAuth");
const bcrypt = require("bcrypt");
const { isValidEditData } = require("../utils/validate");

const profileRouter = express.Router();

//profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send("Every thing is fine");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!isValidEditData(req)) {
      throw new Error("Invalid Edit data!");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();
    res.send(`${loggedInUser.firstName} your Profile update Successfully`);
  } catch (err) {
    res.status(402).send(err.message);
  }
});

//Reset Password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword, reenterNewPassword } = req.body;

    const user = req.user;
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Please Enter correct Password!");
    }

    if (newPassword === reenterNewPassword) {
      const encryptNewPassword = await bcrypt.hash(newPassword, 10);
 
      user.password = encryptNewPassword;
      await user.save();
     
      res.send("Password Update Succefully !");
    } else {
      throw new Error("Pasword doesnot match");
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = profileRouter;
