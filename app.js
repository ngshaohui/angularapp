var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

//Body Parser Middleware
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