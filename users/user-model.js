var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var userSchema = mongoose.model('User', new Schema({ 
	username: String, 
	password: String, 
	admin: Boolean 
}));

module.exports = userSchema;