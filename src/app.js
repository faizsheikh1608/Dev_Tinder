const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const requestRouter = require("./router/requestRouter");
const authRouter = require("./router/authRouter");
const profileRouter = require("./router/profileRouter");
const userRouter = require("./router/userRouter");

//creating a web server

const app = express();

//Middleware for parsing JSON data
app.use(express.json());
app.use(cookieParser());

//Routing
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
