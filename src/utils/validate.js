const validator = require("validator");

const validateSignup = function (req) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName) {
    throw new Error("First Name is not valid");
  } else if (!lastName) {
    throw new Error("Last Name is not Valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter Strong Password");
  }
};

const isValidEditData = function (req) {
  const validField = ["firstName", "lastName", "age", "photoURL", "gender"];

  const user = req.user;
  const isValid = Object.keys(req.body).every((field) =>
    validField.includes(field)
  );
  return isValid;
};

module.exports = { validateSignup, isValidEditData };
