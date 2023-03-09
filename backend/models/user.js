// Variable for Mongoose

const mongoose = require('mongoose');

// Rule set for User Data

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    username: String, 
    email: String, 
    password: String, 
    image_url: String,
})

mongoose.exports = mongoose.model('User', userSchema); 