const mongoose = require('mongoose'); // Use 'mongoose' instead of 'mongo'
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true }, // Add 'required: true' if the name is mandatory
});

module.exports = mongoose.model("Category", CategorySchema); // Use singular 'Category' for consistency
