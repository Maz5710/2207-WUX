// Variable for Mongoose 

const mongoose = require ('mongoose'); 

// Rule set for Project Data

const projectSchema = new mongoose.Schema({
    _id: moongoose.Schema.Types.ObjectId, 
    name: String,
    image_url: String, 
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})

module.exports = mongoose.model('Project', projectSchema);