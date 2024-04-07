const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    product: {
        type: String
      },
      username: {
        type: String
      },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
