const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_STRING)
.then(()=>console.log("database connect successfully!"))
}

module.exports = connectDatabase;