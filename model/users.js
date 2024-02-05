const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: {type: String, unique: true},
  password: String,
  role: {
    type: [String], // Specifies that arrayOfValues is an array of strings
    default: [], // Default value for the array (optional)
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;