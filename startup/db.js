const winston = require('winston');
var mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    const db = config.get('db');
    //const db = "mongodb://localhost/vidly";
    mongoose.connect(db)
        .then(() => winston.info(`Conected to ${db}...`));
}