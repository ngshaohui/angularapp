var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var blogpostSchema = require('./blogpost-model');
var Blogpost = mongoose.model('Blogpost', blogpostSchema);
var BlogpostDraft = mongoose.model('BlogpostDraft', blogpostSchema);

//create new blogpost
router.post('/posts', function (req, res, next) {
    var newBlogpost = new Blogpost();
    newBlogpost.postId = req.body.postId;
    newBlogpost.title = req.body.title;
    newBlogpost.content = req.body.content;
    // newBlogpost.date = req.body.date;
    // newBlogpost.published = req.body.published;
    // newBlogpost.hidden = req.body.hidden;
    // newBlogpost.meta.favs = req.body.meta.favs;

    newBlogpost.save(function(err, blogpost) {
        if (err) {
            res.sendStatus(400);
            res.send(err);
        } else {
            console.log(blogpost);
            res.sendStatus(200);
        }
    });
});

router.patch('/posts/:id', function(req, res, next) {
    //TODO
});

router.delete('/posts/:id', function(req, res, next) {
    //TODO
});

//get post by ID
router.get('/posts/:id', function(req, res, next) {
    Blogpost.findOne({
        id: req.params.id
    })
    .exec(function(err, blogpost) {
        if (err) {
            res.send(err);
        } else {
            res.json(blogpost);
        }
    });
});

//get post by month

module.exports = router;