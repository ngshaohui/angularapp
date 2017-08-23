var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var blogpostSchema = require('./blogpost-model');
var Blogpost = mongoose.model('Blogpost', blogpostSchema);
var BlogpostDraft = mongoose.model('BlogpostDraft', blogpostSchema);
var DeletedDraft = mongoose.model('DeletedDraft', blogpostSchema);
var config = require('../config.js');

// CREATE blogpost draft
router.post('/drafts', function (req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        var newBlogpostDraft = new BlogpostDraft();
        newBlogpostDraft._id = req.body.id;
        newBlogpostDraft.title = req.body.title;
        newBlogpostDraft.content = req.body.content;
        newBlogpostDraft.created = req.body.created;
        newBlogpostDraft.first_published = req.body.firstPublished;
        newBlogpostDraft.last_updated = req.body.lastUpdated;
        newBlogpostDraft.last_autosave = req.body.lastAutosave;
        newBlogpostDraft.tags = req.body.tags;
        newBlogpostDraft.is_published = req.body.isPublished;
        // newBlogpostDraft.hidden = req.body.hidden;
        // newBlogpostDraft.meta.favs = req.body.meta.favs;
        console.log(newBlogpostDraft);

        newBlogpostDraft.save(function(err) {
            if (err) {
                console.log("an error occured while attempting to CREATE the draft");
                console.log(err);
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

// GET draft by ID
// TODO need to handle case where entry is not found in collection
router.get('/drafts/:id', function(req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        BlogpostDraft.findById(req.params.id, function(err, draft) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(draft);
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

// GET all drafts
router.get('/drafts', function(req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        BlogpostDraft.find({}, function(err, drafts) {
            if (err) {
                res.send(err); // TODO figure out how to do error handling
            } else {
                res.json(drafts);
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

// UPDATE draft
router.patch('/drafts/:id', function (req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        BlogpostDraft.findById(req.params.id, function(err, blogpostDraft) {
            if (err) {
                res.send(err).status(400);
            } else {
                // update each possible attribute
                blogpostDraft._id = req.body._id || blogpostDraft.id;
                blogpostDraft.title = req.body.title || blogpostDraft.title;
                blogpostDraft.content = req.body.content || blogpostDraft.content;
                blogpostDraft.created = req.body.created || blogpostDraft.created;
                blogpostDraft.first_published = req.body.first_published || blogpostDraft.firstPublished;
                blogpostDraft.last_updated = req.body.last_updated || blogpostDraft.lastUpdated;
                blogpostDraft.last_autosave = req.body.last_autosave || blogpostDraft.lastAutosave;
                blogpostDraft.tags = req.body.tags || blogpostDraft.tags;
                blogpostDraft.is_published = req.body.is_published || blogpostDraft.isPublished;

                blogpostDraft.save(function (err, blogpostDraft) {
                    if (err) {
                        console.log("an error occured while attempting to SAVE the draft");
                        console.log(err);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

// DELETE draft
router.delete('/drafts/:id', function(req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        BlogpostDraft.findByIdAndRemove(req.params.id, function(err, draft) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                console.log(draft);
                console.log("success deleting");
                res.sendStatus(200);
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

// CREATE new blogpost
router.post('/posts', function (req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        var token = req.get('Authorization');
        var decoded = jwt.verify(token, config.secret);
        console.log(decoded);

        var newBlogpost = new Blogpost();
        newBlogpost._id = req.body.id;
        newBlogpost.title = req.body.title;
        newBlogpost.content = req.body.content;
        newBlogpost.created = req.body.created;
        newBlogpost.first_published = req.body.firstPublished;
        newBlogpost.last_updated = req.body.lastUpdated;
        newBlogpost.last_autosave = req.body.lastAutosave;
        newBlogpost.tags = req.body.tags;
        newBlogpost.is_published = req.body.isPublished;
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
    // } else {
    //     res.sendStatus(403);
    // }
});

// GET post by ID
router.get('/posts/:id', function(req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        Blogpost.findById(req.params.id, function(err, blogpost) {
            if (err) {
                res.send(err);
            } else {
                res.json(blogpost);
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

// GET all blogposts
router.get('/posts', function(req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        Blogpost.find({}, function(err, blogposts) {
            if (err) {
                res.send(err); // TODO figure out how to do error handling
            } else {
                res.json(blogposts);
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

// TODO get post by month

// TODO get posts in date range

// UPDATE blogpost
router.patch('/posts/:id', function(req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
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
    // } else {
    //     res.sendStatus(403);
    // }
});

// DELETE blogpost
router.delete('/posts/:id', function(req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        Blogpost.findByIdAndRemove(req.params.id, function(err, blogpost) {
            if (err) {
                res.sendStatus(400);
                res.send(err);
            } else {
                console.log(blogpost);
                res.sendStatus(200);
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

// CREATE deleted blogpost draft
router.post('/trash', function (req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        var deletedBlogpost = new DeletedDraft();
        deletedBlogpost._id = req.body.id;
        deletedBlogpost.title = req.body.title;
        deletedBlogpost.content = req.body.content;
        deletedBlogpost.created = req.body.created;
        deletedBlogpost.first_published = req.body.firstPublished;
        deletedBlogpost.last_updated = req.body.lastUpdated;
        deletedBlogpost.last_autosave = req.body.lastAutosave;
        deletedBlogpost.tags = req.body.tags;
        deletedBlogpost.is_published = req.body.isPublished;
        // deletedBlogpost.hidden = req.body.hidden;
        // deletedBlogpost.meta.favs = req.body.meta.favs;
        console.log(deletedBlogpost);

        deletedBlogpost.save(function(err) {
            if (err) {
                console.log("an error occured while attempting to CREATE the deletedBlogpost");
                console.log(err);
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

// GET all blogposts
router.get('/trash', function(req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        DeletedDraft.find({}, function(err, deletedBlogposts) {
            if (err) {
                res.send(err); // TODO figure out how to do error handling
            } else {
                res.json(deletedBlogposts);
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

// DELETE blogpost
router.delete('/trash/:id', function(req, res, next) {
    // var token = req.get('Authorization');
    // var decoded = jwt.verify(token, config.secret);
    // if (decoded.admin) {
        DeletedDraft.findByIdAndRemove(req.params.id, function(err, deletedBlogpost) {
            if (err) {
                res.sendStatus(400);
                res.send(err);
            } else {
                console.log(deletedBlogpost);
                res.sendStatus(200);
            }
        });
    // } else {
    //     res.sendStatus(403);
    // }
});

module.exports = router;