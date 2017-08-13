var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var blogpostSchema = require('./blogpost-model');
var Blogpost = mongoose.model('Blogpost', blogpostSchema);
var BlogpostDraft = mongoose.model('BlogpostDraft', blogpostSchema);
var config = require('../config.js');

// Create new blogpost draft
router.post('/drafts', function (req, res, next) {
    var newBlogpostDraft = new BlogpostDraft();
    newBlogpostDraft._id = req.body.postId;
    newBlogpostDraft.title = req.body.title;
    newBlogpostDraft.content = req.body.content;
    // newBlogpostDraft.created = req.body.created;
    // newBlogpostDraft.published = req.body.published;
    // newBlogpostDraft.hidden = req.body.hidden;
    // newBlogpostDraft.meta.favs = req.body.meta.favs;

    newBlogpostDraft.save(function(err, blogpost) {
        if (err) {
            // res.sendStatus(400);
            console.log(err);
            res.send(err);
        } else {
            console.log(blogpost);
            res.sendStatus(200);
        }
    });
});

// Create new blogpost
router.post('/posts', function (req, res, next) {
    var token = req.get('Authorization');
    var decoded = jwt.verify(token, config.secret);
    console.log(decoded);

    var newBlogpost = new Blogpost();
    newBlogpost._id = req.body.id;
    newBlogpost.title = req.body.title;
    newBlogpost.content = req.body.content;
    newBlogpost.created = req.body.created;
    // newBlogpost.published = req.body.published;
    // newBlogpost.hidden = req.body.hidden;
    // newBlogpost.meta.favs = req.body.meta.favs;

    newBlogpost.save(function(err, blogpost) {
        if (err) {
            res.sendStatus(400);
            console.log(err);
        } else {
            console.log(blogpost);
            res.sendStatus(200);
        }
    });
});

// Update blogpost
router.patch('/posts/:id', function(req, res, next) {
    Blogpost.findById(req.params.id, function(err, blogpost) {
        if (err) {
            res.send(err);
        } else {
            // update each possible attribute
            blogpost._id = req.body._id || blogpost._id;
            blogpost.title = req.body.title || blogpost.title;
            blogpost.content = req.body.content || blogpost.content;

            blogpost.save(function (err, blogpost) {
                if (err) {
                    res.sendStatus(400);
                    res.send(err);
                } else {
                    console.log(blogpost);
                    res.sendStatus(200);
                }
            });
        }
    });
});

// Delete blogpost
router.delete('/posts/:id', function(req, res, next) {
    console.log(req.headers);
    // var decoded = jwt.verify(token, config.secret);
    // console.log(decoded);
    Blogpost.findByIdAndRemove(req.params.id, function(err, blogpost) {
        if (err) {
            res.sendStatus(400);
            res.send(err);
        } else {
            console.log(blogpost);
            res.sendStatus(200);
        }
    });
});

// Get post by ID
router.get('/posts/:id', function(req, res, next) {
    Blogpost.findById(req.params.id, function(err, blogpost) {
        if (err) {
            res.send(err);
        } else {
            res.json(blogpost);
        }
    });
});

//TODO get post by month
router.post('/posts/:id', function(req, res, next) {
    Blogpost.find({
        date_published: new Date(req.body.date)
    })
    .exec(function(err, blogpost) {
        if (err) {
            res.send(err);
        } else {
            res.json(blogpost);
        }
    });
});

//TODO get posts in date range

module.exports = router;