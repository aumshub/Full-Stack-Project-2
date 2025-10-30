const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const {createPostController} = require('../controller/post.controller')






const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage()
})

// POST /api/post {image-file} [protected] meaning if user is not logged in then they cannot access this API

// router.post('/') // here we only written / in API name because already we have given /api/post in app.js so this route will directly work as /api/post/

/*


router.post('/', async (req,res)=>{
    // To make API [protected]
    const token = req.cookies.token
    if(!token){ // no token meaning user is not logged in
        return res.status(401).json({
            message: 'please login first'
        })
    }


    // After getting token now will verify the if the token is correct or not using jwt, jwt.verify() method verifies the token is correct or not, and returns 2 things, if token is correct then jwt.verify() will return the payload which we set while generating the token, in this app in the authController register and login API the payload is user id so here if token is correct it returns the user id and store it to the decoded veriable, but if the token is incorrect then it will return an error so to catch that error we will user try and catch statement
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({
            _id: decoded.id
        })

        // here we are creating a new property in req property name is user, till now req.user property was not existing, but now we are creating a new property in req and property name is user.
        // yes we can create multiple properties in req and give any name to property here for better understanding we are giving property name user so we can get that user data is there
        req.user = user;

    } catch (error) {
        return res.status(401).json({
            message:'Invalid token, please login again'
        })
    }


    // The API is now protected — if the token is not present or incorrect, the API cannot be accessed.


    
    
})

*/


router.post('/',
    authMiddleware, // after next() will be called in authMiddleware then the request will pass on to createPostController 
    upload.single("image"),
     createPostController)



module.exports = router;