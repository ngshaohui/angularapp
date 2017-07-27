var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

function hashPassword(password) {
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        if (err) {
            console.warn("Something went wrong when encrypting the password");
        } else {
            return hash;
        }
    });
}

function checkPassword(password, hash) {
    bcrypt.compare(password, hash, function(err, res) {
        if (err) {
            console.warn("Something went wrong when comparing the password");
        } else {
            return res;
        }
    });
}

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({ 
	username: String, 
	password: String, 
	admin: Boolean 
}));