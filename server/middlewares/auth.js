const jwt= require("jsonwebtoken");
const ErrorHandler = require("../utilities/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require("../models/userModel");

const isAuthenticateUser = catchAsyncError(async (req, res, next)=>{
    const {token} = req.cookies;
    console.log(token);
    if(!token){
        return next(new ErrorHandler("Please logged in for access!",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
})

const authorizedRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed for access this page!`,403));
        }
        next();
    }
}

module.exports = {
    isAuthenticateUser,
    authorizedRoles,
}  