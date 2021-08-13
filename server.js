var express  = require('express');
var bodyParser = require('body-parser'); 
var app      = express(); 
const mongoose= require('mongoose');


var port = process.env.PORT || 6000;

const Routers = require('./Routers');

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json


app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});


app.use('/api', Routers);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });
  

  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });
  

  // Databses Connection with server Up time
  mongoose
      .connect(
        'mongodb://localhost:27017/Nikhil',
         {useCreateIndex: true,useNewUrlParser: true,useUnifiedTopology: true})
      .then(()=> {
        app.listen(port);
        console.log("Server listening on port : " + port);
  
      })
      .catch( err =>{
        console.log("Unable to Connect with Mongo DB. Please Up the Database server.");
      })
  