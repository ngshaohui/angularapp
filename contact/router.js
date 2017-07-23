var express = require('express');
var router = express.Router();
var contact = require('./contact.js');

router.post('/send', function (req, res, next) {
  var status = contact.sendMail(req.body);
  res.json(status);
});

module.exports = router;