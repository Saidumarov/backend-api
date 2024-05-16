// RegisterModel.js
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  new_password: String,
});

const Register = mongoose.model("Users", registerSchema);

module.exports = Register;
