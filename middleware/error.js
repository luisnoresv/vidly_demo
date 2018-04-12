const winston = require('winston');

module.exports = function (err, req, res, next) {
    // Log the exception
    winston.error(err.message, err);
    // error, warn, info
    res.status(500).send('Something failed.');
}