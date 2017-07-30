var express = require('express');
var router = express.Router();
var User = require('./user-model.js');
var helper = require('./helper.js');

router.post('/register', function(req, res, next) {
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.admin = req.body.admin;

    helper.hashPassword(req.body.password)
    .then(function(hashedPassword) {
        newUser.password = hashedPassword;

        newUser.save(function(err, user) {
            if (err) {
                res.sendStatus(400);
                res.send(err);
            } else {
                console.log(user);
                res.sendStatus(200);
            }
        });
    }).catch(function(err){
        console.log(err);
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
            if (helper.checkPassword(req.body.password, user.password)) {
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