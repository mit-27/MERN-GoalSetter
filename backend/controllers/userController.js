const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

// User Model
const User = require('../models/userModel')




// @desc Register new user
// @route Post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // if any of above is not present in req.body then throw error
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all field values')
    }

    // check if user exists already with email
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    // check if user created successfully or not
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('User not created successfully so please try again')
    }
})

// @desc Authenticate a user
// @route Post /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // check for user email
    const user = await User.findOne({ email })


    // Here if user exists then and then bcrypt will compare password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }


})

// @desc Het user data
// @route Get /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    // Here we directly get user data as we assign user in req in authMiddleware
    const { _id, email, name } = await User.findById(req.user.id)

    res.json({
        id: _id,
        name,
        email
    })
})


// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}




module.exports = {
    registerUser,
    loginUser,
    getMe
}