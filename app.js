var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

var config = require('./config');

var app = express();
app.set('superSecret', config.secret);
mongoose.connect(config.database);

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //needs to come before routes are defined

var port = process.env.PORT || 3000;

var contact = require('./contact/router');
var blogposts = require('./blogposts/router');

//Set Static Folder
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', blogposts);
app.use('/contact', contact);

//Start server
app.listen(port, function () {
  console.log('server started on port ' + port);
});