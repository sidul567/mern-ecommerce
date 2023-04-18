const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

// router import
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const errorMiddleware = require('./middlewares/error');

app.use('/api/v1',productRoute);
app.use('/api/v1',userRoute);

// error handler
app.use(errorMiddleware);

module.exports = app;