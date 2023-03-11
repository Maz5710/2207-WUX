// Variable for Mongoose 
const mongoose = require ('mongoose'); 

// Rule set for Project Data
const projectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    project_description: String,
    project_name: String,
    project_img: String, 
    username: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Username'
    }
})

module.exports = mongoose.model('Project', projectSchema);