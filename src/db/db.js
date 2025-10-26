const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("conntct to DB");
    })
    .catch((error)=>{
        console.log("error connecting to DB", error)
    })
}

module.exports = connectDB;
