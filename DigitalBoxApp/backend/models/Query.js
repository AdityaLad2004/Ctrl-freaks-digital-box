const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  title: String,
  description: String,
  username: String
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
