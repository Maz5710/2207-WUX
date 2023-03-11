// Variable for Mongoose
const mongoose = require('mongoose');

// Rule set for User Data
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    username: String, 
    firstname: String,
    surname: String,
    email: String, 
    password: String, 
    user_img: String,
    bio: String,
    git_url: String,
    website_url: String
})

module.exports = mongoose.model('User', userSchema);
