const mongoose = require('mongoose');

//Creating Schema using mongoose
const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    }
})

//Creating models
const memberModel = mongoose.model('member', memberSchema);
module.exports = memberModel;