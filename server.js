//server.js

//set up =========================================
var express = require('express');
var app = express();                            //Create our app w/ express
var mongoose = require('mongoose');             //mongoose for mongodb
var morgan = require('morgan');                 //log requests to the console (express4)
var bodyParser = require('body-parser');        //PULL information from HTML POST
var methodOverride = require('method-override'); //Simulates DELETE and PUT 

//configuration ==================================

var database = require('./config/database');
//load the database
mongoose.connect(database.url);
app.use(express.static(__dirname + '/public'));  //set the static files location /public/img wil be /img for users
app.use(morgan('dev'));                                                                        app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
var port = process.env.PORT || 3000;

//load the routes
require('./app/routes')(app);
    
//listen (start app with node server.js) =====================
app.listen(port);
console.log("App listening on port "+ port);