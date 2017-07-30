var express = require('express');
var nodemailer = require('nodemailer');

// TODO add template for the email
// returns an object containing the success status and response
function sendMail(body) {
  var message = "Message from:\n\n" + body.name + "\n\n\n";
  message += 'Email address:\n\n' + body.email + "\n\n\n";
  message += 'Message:\n\n' + body.message + "\n\n\n";

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
      return {
        success: false,
        status: info.response
      }
    } else {
      console.log('Message sent: ' + info.response);
      return {
        success: true,
        status: info.response
      }
    }
  });
}

module.exports = {
  sendMail
}