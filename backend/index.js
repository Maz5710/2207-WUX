// Global Variables 
// need to make consts for express, app(for express), cors, bodyParser, mongoose, bcrypt, config (config.json), profileUser (for user schema), Projects (for projects schema), port (for local server)

const express = require('express'); // includes express into backend
const app = express(); // variable of app to us express method
const cors = require('cors'); // bring in CORS
const bodyParser = require('body-parser'); // include BodyParser 
const mongoose = require('mongoose'); // import mongoose
const bcrypt = require('bcryptjs');
const config = require('./config.json'); // get config
const Project = require('./models/project');
const User = require('./models/user');

// Set the port number for our local server
const port = 5500; 

// app.use for express 
app.use((req, res, next) => {
    console.log(`${req.method} request ${req.url}`);
    next();
})

// express using bodyParser and urlencoded 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// app.use cors method 
app.use(cors());

// Sent to backend on req
app.get('/', (req, res) => res.send("Hello from the backend 2207-WUX")); 

// Setup Mongoose Connection to MongoDB
// replace user and password, clustername and mongoDB name with template literals instead of config user data 
mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.${config.MONGO_CLUSTER_NAME}.mongodb.net/${config.MONGO_DBNAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('DB Connected'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    })

// app.listen - sent to nodemon checking server for changes 
app.listen(port, () => console.log(`My fullstack app is listening on port ${port}`))


// -------------- PROJECT END POINTS --------------------------

// Get All Projects from the Database
app.get('/allProjectsFromDB', (req, res) => {
    Project.find().then(result => {
        res.send(result)
    })
})

// Post Method to CREATE a project
app.post('/addProject', (req, res) => {
    const dbProject = new Project({
      _id: new mongoose.Types.ObjectId,
      project_description: req.body.project_description,
      project_name: req.body.project_name,
      project_img: req.body.project_img,
      username: req.body.username
    });

    //save to the database and notify the user
    dbProject.save().then(result => {
      res.send(result);
    }).catch(err => res.send(err));
})

// Edit UPDATE using 'PATCH' http method
app.patch('/updateProject/:id', (req, res) => {
    const idParam = req.params.id;
    Project.findById(idParam, (err, project) => {
        const updatedProject = {
            project_description: req.body.project_description,
            project_name: req.body.project_name,
            project_img: req.body.project_img,
            username: req.body.username
        }
        Project.updateOne({
            _id: idParam
        }, updatedProject).
        then(result => {
            res.send(result);
        }).catch(err => res.send(err))
    })
})

// DELETE using 'DELETE' project
app.delete('/deleteProject/:id', (req,res) => {
    const idParam = req.params.id;
    project.findOne({
        _id: idParam
    }, (err, project) => {
        if (project) {
            Project.deleteOne({
                _id: idParam
            }, err => {
                console.log('Deleted on backend request 2207-WUX');
            });
        } else {
            alert('not found');
        }
    }).catch(err => res.send(err));
});


// -------------- USER END POINTS ----------------------------------

// Get All Users from the Database
app.get('/allUsersFromDB', (req, res) => {
    User.find().then(result => {
        res.send(result)
    })
})

//Login User
app.post('/loginUser', ( req, res)=>{
    User.findOne({username:req.body.username},(err,userResult)=>{
      if (userResult){
        if (req.body.password === userResult.password){
          res.send(userResult);
        } else {
          res.send('not authorized');
        }// inner if
      } else {
        res.send('user not found. Please register');
      }//outer if
    });//find one ends
  });//end of post for login

  