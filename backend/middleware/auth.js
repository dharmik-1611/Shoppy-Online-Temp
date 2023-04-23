const Errorhandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new Errorhandler("please login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    // console.log(req.user);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new Errorhandler(`Role : ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    };

};