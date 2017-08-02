var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

// Cors middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(config.database, {
  useMongoClient: true
});
// Use native promises
mongoose.Promise = global.Promise;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //needs to come before routes are defined

var port = process.env.PORT || 3000;

var contact = require('./contact/router');
var blogposts = require('./blogposts/router');
var users = require('./users/router');

// Set Static Folder
app.use(express.static(path.join(__dirname, '/public')));

// Declare routes
app.use('/api', blogposts);
app.use('/auth', users);
app.use('/contact', contact);

// Start server
app.listen(port, function () {
  console.log('server started on port ' + port);
});