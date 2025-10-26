const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true, // schema validation meaning we are setting one rule that all the usernames in the database should not be same they should be unique
        require:true // without username user will not be created 
    },
    password:{
        type:String,
    }
});

const userModel = mongoose.model("user", userSchema);


module.exports = userModel;