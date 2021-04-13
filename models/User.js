const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    phoneNumber: { type: String},
    date_created: { type: Date, default: Date.now}
})

module.exports = mongoose.model('User', UserSchema);