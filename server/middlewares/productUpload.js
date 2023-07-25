const ErrorHandler = require('../utilities/errorHandler');
const uploader = require('../utilities/ImageUploader');

const productUpload = (req,res,next)=>{
    const upload = uploader(
        50000000, 
        "Only images are allowed!"
    );

    upload.any()(req, res, (err)=>{
        if(err){
            next(new ErrorHandler(err,404));
        }else{
            next();
        }
    })
}

module.exports = productUpload;