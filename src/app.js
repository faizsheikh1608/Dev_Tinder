const express = require("express");
const connectDB = require("../config/database");
const User = require("../models/user.js");
//creating a web server

const app = express();
//Middleware for parsing JSON data
app.use(express.json());

//Reading Data
//Reading all  Data
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

app.post("/signup", async (req, res) => {
  //creating new instance of user model
  const user = new User(req.body);

  try {
    //Saving data in database
    await user.save();
    res.send("Data save Succesfully");
  } catch (err) {
    res.status(500).send("Something Went Wrong");
  }
});

//Delete a User
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    console.log(user);
    res.send("Data deleted");
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

//connecting DB & Seting Port No.
connectDB()
  .then(() => {
    console.log("Database connect Successfully");
    app.listen(3000, () => {
      console.log("Server Started at port No. 3000!");
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
