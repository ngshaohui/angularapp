var bcrypt = require('bcryptjs');
const SALT_ROUNDS = 12;

function hashPassword(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
            if (err) {
                console.warn("Something went wrong when encrypting the password");
                return reject(err);
            } else {
                return resolve(hash);
            }
        });
    });
}

function checkPassword(password, hash) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, hash, function(err, res) {
            if (err) {
                console.warn("Something went wrong when comparing the password");
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