const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

// Config
dotenv.config({path: "config/.env"});
/*
{
    'credentials': true,
    'origin': "http://localhost:3000",
    'optionsSuccessStatus': 200
}
*/
app.use(cors({
    'credentials': true,
    'origin': [
        "http://localhost:3000",
        "https://mern-ecommerce-567.netlify.app",
    ],
    'methods': ['GET', 'POST', 'PUT', 'DELETE'],
    'allowedHeaders': [
        'Access-Control-Allow-Origin',
        'Content-Type',
        'Authorization' 
    ]
}));
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit:'50mb', 'extended': true}));

// router import
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/PaymentRoute');
const contactRoute = require('./routes/contactRoute');
const errorMiddleware = require('./middlewares/error');

app.use('/api/v1',productRoute); 
app.use('/api/v1',userRoute);
app.use('/api/v1',orderRoute);
app.use("/api/v1",paymentRoute); 
app.use("/api/v1",contactRoute);

// error handler
app.use(errorMiddleware);

module.exports = app;