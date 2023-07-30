const User = require('../models/userModel');
const ErrorHandler = require('../utilities/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utilities/jwtToken');
const { sendEmail } = require('../utilities/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const myCloud = await cloudinary.uploader.upload(req.files[0].path,{'folder': 'avatars',});
    
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })

    sendToken(user, 200, res);
})

const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password!", 401));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password!", 401));
    }

    const isMatchedPassword = await user.comparePassword(password);

    if (!isMatchedPassword) {
        return next(new ErrorHandler("Invalid email or password!", 401));
    }

    sendToken(user, 200, res);
})

const logoutUser = catchAsyncError(async (req, res, next) => {
    const options = {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: 'none',
    }    
    res.status(200).cookie("token",null,options).json({
        success: true,
        message: "Logged out!"
    });
    // res.status(200).clearCookie("token", options).json({
    //     success: true,
    //     message: "Logged out!"
    // })
})

const forgetPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("Invalid email or password!", 401));
    }

    // get reset password token
    const resetPasswordToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.get("origin")}/password/reset/${resetPasswordToken}`;
    console.log(resetPasswordUrl);
    const message = `Your password reset link is: \n\n${resetPasswordUrl}\n\nIf you aren't sent this request then ignore it. Link will be destroy after 15 minutes!`;

    try {
        sendEmail({
            email: user.email,
            subject: "Mern-eccomerce password recovery",
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully!`
        })
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        next(new ErrorHandler(err.message, 500));
    }
})

const resetPassword = catchAsyncError(async (req, res, next) => {
    // generate reset password token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
        return next(new ErrorHandler("Invalid or expired token!", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password don't match!", 400));
    }

    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
})

const getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password doesn't match", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("New Password and Confirm Password don't match!", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
        success: true,
        user
    })
})

const updateProfile = catchAsyncError(async (req, res, next) => {
    const {name, email} = req.body;
    const updateUserData = {
        name,
        email
    }
    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id);
        const publicId = user.avatar.public_id;

        await cloudinary.uploader.destroy(publicId);

        const myCloud = await cloudinary.uploader.upload(req.files[0].path,{'folder': 'avatars',});

        updateUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, updateUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })
})

const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

const getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        success: true,
        user
    })
})

const updateUserRole = catchAsyncError(async (req, res, next) => {
    const updateUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })
})

const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found!", 404));
    }

    await user.deleteOne();

    const publicId = user.avatar.public_id;

    await cloudinary.uploader.destroy(publicId);

    res.status(200).json({
        success: true,
        message: "user deleted successfully!",
    })
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgetPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
}