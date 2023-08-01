const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utilities/errorHandler');
const { sendEmail } = require('../utilities/sendEmail');

const sendContactMessage = catchAsyncError(async (req, res, next)=>{
    const {name, email, message} = req.body;

    try {
        sendEmail({
            email: "wordpress693@gmail.com",
            subject: "Contact Message",
            message: `Mail From: \nName: ${name}\nEmail: ${email}\n\nMessage: ${message}`,
        });

        res.status(200).json({
            success: true,
            message: `Message sent successfully!`
        })
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
})

module.exports = {
    sendContactMessage,
}