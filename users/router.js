var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('./user-model.js');
var helper = require('./helper.js');
var config = require('../config.js');

router.post('/register', function(req, res, next) {
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.admin = req.body.admin;

    helper.hashPassword(req.body.password)
    .then(function(hashedPassword) {
        newUser.password = hashedPassword;

        newUser.save(function(err, user) {
            if (err) {
                res.send(err);
            } else {
                console.log(user);
                res.sendStatus(200);
            }
        });
    }).catch(function(err){
        console.log(err);
        res.send(err);
    });
});

router.post('/login', function(req, res, next) {
    User.findOne({
        username: req.body.username
    })
    .exec(function(err, user) {
        if (err) {
            res.sendStatus(400);
            res.send(err);
        } else if (!user) {
            res.json({ success: false, message: 'Authentication failed.' });
        } else {
            //check password
            helper.checkPassword(req.body.password, user.password)
            .then(function(status) {
                if (status) {
                    var token = jwt.sign({
                        username: user.username
                    }, config.secret, {
                        expiresIn: 1440 // expires in 24 hours
                    });

                    res.json({
                        success: true,
                        token: token
                    });
                } else {
                    res.json({ success: false, message: 'Authentication failed.' });
                }
            })
            .catch(function(err) {
                res.sendStatus(400);
            });
        }
    });
});

module.exports = router;