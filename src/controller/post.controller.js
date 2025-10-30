const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service')

async function createPostController(req,res){
    const file = req.file; // from file we will be getting the image now this file we have to give it to the AI and AI will generate a caption for that image. will get the file data, req.file data using multer
    // console.log("Image File",file);

    // converting Buffer image data to Base64 
    const base64Image = new Buffer.from(file.buffer).toString('base64');
    // console.log(base64Image)

    // sending base64Image to AI for caption generation
    const caption = await generateCaption(base64Image);
    console.log(caption)



}

module.exports = {
    createPostController
};
