const ErrorHandler = require("../utilities/errorHandler");

const errorMiddleware = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error!"

    if(err.name === "CastError"){
        const message = `Resource not found. Error: ${err.path}`;
        err = new ErrorHandler(message,404);
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered!`;
        err = new ErrorHandler(message,404);
    }

    if(err.name === "JsonwebTokenError"){
        const message = `Invalid Json Web Token!`;
        err = new ErrorHandler(message,404);
    }

    if(err.name === "tokenExpiredError"){
        const message = `Json Web Token Expired!`;
        err = new ErrorHandler(message,404);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message
    })
}

module.exports = errorMiddleware;