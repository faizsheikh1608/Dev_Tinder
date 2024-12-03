const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodedMessage = await jwt.verify(token, "Faiz@123");

    const user = await User.findById(decodedMessage._id);

    if (!user) {
      throw new Error("Please Login");
    }
    console.log("Hi from userAuth" + user.firstName);

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Some thing went wrong");
  }
};

module.exports = userAuth;
