const mongoose = require('mongoose'); // Use 'mongoose' instead of 'mongo'
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Correct usage of mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Patient", PatientSchema); // Consistent naming for the model
