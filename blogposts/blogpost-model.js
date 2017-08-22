var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogpostSchema = new Schema({
  _id: { type : String },
  title: { type : String },
  content: { type : String },
  created: { type : String },
  first_published: { type : String },
  last_updated: { type : String },
  last_autosave: { type : String },
  tags: { type : [String] },
  is_published: { type : String },
  // is_hidden: Boolean,
  // meta: {
  //   favs: {
  //     type: Number,
  //     default: 0
  //   }
  // }
});

module.exports = blogpostSchema;