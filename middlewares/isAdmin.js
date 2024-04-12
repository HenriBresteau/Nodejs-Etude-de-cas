const UnauthorizedError = require("../errors/unauthorized");

module.exports = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new UnauthorizedError("Only admins can do this"));
    }
    next();
};
