const ErrorHandler = require('../utilities/errorHandler');
const uploader = require('../utilities/singleFileUploader');

const avatarUpload = (req,res,next)=>{
    const upload = uploader(
        100000, 
        ['image/jpg', 'image/png', 'image/jpeg'],
        "Only jpg, png and jpeg are allowed!"
    );

    upload.any()(req, res, (err)=>{
        if(err){
            next(new ErrorHandler(err,404));
        }else{
            next();
        }
    })
}

module.exports = avatarUpload;