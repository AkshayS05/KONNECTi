const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SignUp = mongoose.model('SignUp', signupSchema);

module.exports = SignUp;
