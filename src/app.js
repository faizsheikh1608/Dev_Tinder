const express = require("express");

//creating a web server
const app = express();

//Requestr Handler

app.use("/test", (req, res) => {
  res.send("I am in dashboard");
});

app.use("/home", (req, res) => {
  res.send("I am in home");
});

app.use("/", (req, res) => {
  res.send("I am in test");
});

//Seting Port No.
app.listen(3000, () => {
  console.log("Server Started at port No. 3000");
});
