const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 40,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Weak PassWord");
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,

      validate(value) {
        if (!["male", "female", "transgender"].includes(value)) {
          throw new error("Something Went wrong in gender");
        }
      },
    },
    photoURL: {
      type: String,
      default: "https://i.sstatic.net/l60Hf.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Ivalid URL");
        }
      },
    },
    Skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
