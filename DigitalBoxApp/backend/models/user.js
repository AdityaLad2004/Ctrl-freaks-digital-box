const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  userId: String,
  password: String,
  accountNumber: String,
  accountType: String,
  phoneNumber: String,
  email: String,
  panNumber: String,
  products: [String],
});

module.exports = mongoose.model('User',userSchema);