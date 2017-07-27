var express = require('express');
var router = express.Router();
var User = require('./user.js');

router.post('/register', function(req, res, next) {
    var newUser = new User();
    newUser.name = req.body.name;
    newUser.password = User.hashPassword(req.body.password);
    newUser.admin = req.body.admin;

    newUser.save(function(err, user) {
        if (err) {
            res.sendStatus(400);
            res.send(err);
        } else {
            console.log(user);
            res.sendStatus(200);
        }
    });
});

router.get('/login', function(req, res, next) {
    User.findOne({
        username: req.body.username
    })
    .exec(function(err, user) {
        if (err) {
            res.sendStatus(400);
            res.send(err);
        } else {
            //check password
            if (User.checkPassword(req.body.password, user.password)) {
                console.log("SUCCESS");
                res.sendStatus(200);
            } else {
                console.log("FAILURE");
                res.sendStatus(200);
            }
        }
    });
});

module.exports = router;