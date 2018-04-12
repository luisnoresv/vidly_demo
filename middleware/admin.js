//we can not use exports with anonymus types
module.exports = function (req, res, next) {
    // 401 Unauthorized: no token
    // 403 Forbiden: token with no access
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');

    next();
}