// external import
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// internal import
const app = require('./app');
const connectDatabase = require('./config/database');

// uncaught handling
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err}`);
    console.log('Shut down server due to uncaught exception!');
    process.exit(1);
})

// Config
dotenv.config({path: "server/config/.env"});

// connect database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port ${process.env.PORT}`);
})

// config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// unhandle promise rejection
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err}`);
    console.log('Shut down server due to unhandledRejection exception!');
    
    server.close(()=>{
        process.exit(1);
    }) 
}) 