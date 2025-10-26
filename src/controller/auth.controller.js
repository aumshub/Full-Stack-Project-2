// API controller functionality/logic here
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


async function registerController(req, res) {
    const { username, password } = req.body;

    const isUsernameAlreadyExist = await userModel.findOne({
        username
    });

    if (isUsernameAlreadyExist) {
        return res.status(409).json({
            message: 'username already exists'
        })
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    });


    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)


    res.status(201).json({
        message: 'user account is created successfully',
        user
    })

}

async function loginController(req, res) {
    const { username, password } = req.body;
    console.log(username,password)

    const isUserExists = await userModel.findOne({
        username: username
    });

    if (!isUserExists) {
        return res.status(400).json({
            message: 'user account does not exists'
        })
    }

    const isPasswordValid = await bcrypt.compare(password,isUserExists.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'password is invalid'
        })
    }

    // if password is valid then will generate a token
    const token = jwt.sign({
        id: isUserExists._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
        message: 'user logged in successfully',
        isUserExists:{
            username: isUserExists.username,
            id: isUserExists._id
        }
    })

}


module.exports = {
    registerController,
    loginController
} // we exported in object because we have to export multiple functions