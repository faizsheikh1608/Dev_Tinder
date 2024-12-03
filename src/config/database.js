const mongoose = require("mongoose");

const connectDB = async function () {
  await mongoose.connect(
    "mongodb+srv://faiz1608:Faiz%40123@faizdb.rfus4.mongodb.net/FaizDB?retryWrites=true&w=majority&appName=FaizDB/devTinder"
  );
};

module.exports = connectDB;
