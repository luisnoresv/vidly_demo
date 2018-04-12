const config = require('config');

module.exports = function (param) {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('Fatal Error: jwtPrivateKey is not define');
        // 1: Code to exit the app, 0: success
        //process.exit(1);
    }
}