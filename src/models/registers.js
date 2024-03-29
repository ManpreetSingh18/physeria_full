const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true

  },
  password: {
    type: String,
    required: true
  }
})

//defining collection
const Register = new mongoose.model('Register', SignUpSchema)
module.exports = Register;
