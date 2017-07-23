var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

var port = process.env.PORT || 3000;

var contact = require('./contact/contact');
var posts = require('./contact/posts');

//Set Static Folder
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', posts);
app.use('/contact', contact);

//Body Parser Middleware
app.use(bodyParser.json());

//Start server
app.listen(port, function () {
  console.log('server started on port ' + port);
});