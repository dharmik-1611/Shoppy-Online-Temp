const ErrorHandler = require('../utils/errorHandler.js');
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    // Wrong MongoDB Id error
    if (err.name === "castError") {
        const message = `Resource Not Found. Invalid :${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400);
    }

    //Wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = `Json Web token is invalid ,Try Again`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === 'TokenExpiredError') {
        const message = `Json Web token is Expired ,Try Again`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}
