var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = 'mongodb://shinlos:d96pmsag@ds153652.mlab.com:53652/blog';
mongoose.connect(db);

//create new blogpost
router.post('/post', function (req, res, next) {
    res.json()
});

//get post by ID
router.get('/posts/:id', function(req, res, next) {
    res.json('test');
});

//get post by month

module.exports = router;