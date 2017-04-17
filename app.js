const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

const port = process.env.PORT || 3000;

//Set Static Folder
app.use(express.static(path.join(__dirname, '/public')));

//Start server
app.listen(port, function () {
  console.log('server started on port ' + port);
});

//Body Parser Middleware
app.use(bodyParser.json());

app.post('/mail', function (req, res, next) {
  var message = "Message from:\n\n" + req.body.name + "\n\n\n";
  message += 'Email address:\n\n' + req.body.email + "\n\n\n";
  message += 'Message:\n\n' + req.body.message + "\n\n\n";

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'SENDER_EMAIL', // Your email id
      pass: 'SENDER_PASSWORD' // Your password
    }
  });

  var mailOptions = {
    from: 'SENDER_EMAIL', // sender address
    to: 'LIST_OF_RECEIVERS', // list of receivers
    subject: 'Customer query', // Subject line
    text: message // plaintext body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({
        success: false,
        status: info.response
      });
    } else {
      console.log('Message sent: ' + info.response);
      res.json({
        success: true,
        status: info.response
      });
    };
  });

});