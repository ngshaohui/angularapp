var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var blogpostSchema = require('./blogpost-model');
var Blogpost = mongoose.model('Blogpost', blogpostSchema);
var BlogpostDraft = mongoose.model('BlogpostDraft', blogpostSchema);

// Create new blogpost
router.post('/posts', function (req, res, next) {
    var newBlogpost = new Blogpost();
    newBlogpost._id = req.body.postId;
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

//get post by month
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

//get posts in date range

module.exports = router;