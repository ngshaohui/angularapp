var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogpostSchema = new Schema({
  title: String,
  content: String,
  date: { 
    type: Date, 
    default: Date.now 
  },
  published: Boolean,
  hidden: Boolean,
  meta: {
    favs:  Number
  }
});

module.exports = mongoose.model('Blogpost', blogpostSchema)