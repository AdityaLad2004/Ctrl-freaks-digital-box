
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: String,
    _id: String,
    id: Number,
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending',
    },
    description: String,
});

module.exports = mongoose.models.Complaint || mongoose.model('Complaint', complaintSchema);
