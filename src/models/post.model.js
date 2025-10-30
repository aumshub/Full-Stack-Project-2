const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    image:String,
    caption:String, // will generate using AI
    user: {
        type:mongoose.Types.ObjectId, // means here will store Id and Id belongs from which collection will write below this line of code.
        ref:"users" // Id belongs to user collection
    } // based on the user logged in from that user will be getting thir id, whoever user will be logged in we will be getting their id
});

const postModel = mongoose.model("post", postSchema)


module.exports = postModel;