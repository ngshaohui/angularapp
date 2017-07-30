var bcrypt = require('bcryptjs');
const SALT_ROUNDS = 12;

/* 
 * returns a promise of the password hash
 */
function hashPassword(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
            if (err) {
                return reject(err);
            } else {
                return resolve(hash);
            }
        });
    });
}

/*
 * returns a boolean for the status of the password comparison
 */
function checkPassword(password, hash) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, hash, function(err, res) {
            if (err) {
                return reject(err);
            } else {
                return resolve(res);
            }
        });
    });
}

module.exports = {
    hashPassword,
    checkPassword
}