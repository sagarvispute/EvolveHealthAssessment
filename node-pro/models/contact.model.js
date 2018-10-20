const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContactSchema = new Schema({
    contact: Number,
    email: String,
    firstName: String,
    lastName: String,
    status: Boolean
}, {
    timestamps: true
});


// Export the model
module.exports = mongoose.model('contacts', ContactSchema);