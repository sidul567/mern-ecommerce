const multer = require('multer');
const ErrorHandler = require('./errorHandler');
const path = require('path');

const uploader = (
    maxFileSize,
    errorMessage
)=>{
    const storage = multer.diskStorage({
        'filename': (req, file, cb)=>{
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExt,'').toLocaleLowerCase().split(' ').join('-')+Date.now();
            cb(null,fileName+fileExt);
        }
    });

    const upload = multer({
        'storage': storage,
        'limits': {
            'fileSize': maxFileSize,
        },
        'fileFilter': (req, file, cb)=>{
            if(file.mimetype.startsWith('image/')){
                cb(null, true);
            }else{
                cb(new ErrorHandler(errorMessage, 501));
            }
        },
    })

    return upload;
}

module.exports = uploader;