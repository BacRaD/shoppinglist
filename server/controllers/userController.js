const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

//Register User
//  /api/users
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Fill all field")
    }

    const userExist = await User.findOne({email})
    if(userExist) {
        res.status(400)
        throw new Error('User already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }

    res.json({ message: 'Register User' })
})

// Login User
// /api/users/login
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})    


// GET users data
// /api/users/me
const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT

const generateToken =(id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}