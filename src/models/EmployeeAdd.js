
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    _id: String,

});

module.exports = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
