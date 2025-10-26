// All routes/APIs here

const express = require('express');
const {registerController, loginController} = require('../controller/auth.controller')

const router = express.Router();

/*
AUTH API:

POST /api/auth/register
POST /api/auth/login
GET /api/auth/user [protected API] meaning if user is not logged in then they cannot access this API


*/

// before controller folder we were writing controller while creating API like this
// router.post('/register',async(req,res)=>{
//     const {username, password} = req.body;

//     const existingUser = await userModel.findOne({
//         username
//     })

//     if(existingUser){
//         return res.status(409).json({
//             message:"username already exists"
//         })
//     }

//     const user = await userModel.create({
//         username,password
//     });

//     const token = jwt.sign({
//         id:user._id
//     }, process.env.JWT_SECRET)

//     res.cookie('token',token) // storing generated token in cookie ('token name', token)

//     res.status(201).json({
//         message:"user created successfully",
//         user
//     })
    


// })

// After controller
router.post('/register',registerController);
router.post('/login', loginController)


module.exports = router;