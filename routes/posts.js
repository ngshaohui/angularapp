var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://shinlos:d96pmsag@ds153652.mlab.com:53652/blog', ['posts'])

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