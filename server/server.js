// external import
const dotenv = require('dotenv');

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

// unhandle promise rejection
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err}`);
    console.log('Shut down server due to unhandledRejection exception!');
    
    server.close(()=>{
        process.exit(1);
    }) 
}) 