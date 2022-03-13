const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    // We check whether token is in header or not ( It stored like 'Bearer <JWT Token>')
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get User from the token without password field and store it in req so that t could use in Private controller
            req.user = await User.findById(decoded.id).select('-password')

            // // Only assign id in req as we fetch user in getMe controller
            // req.userID = decoded.id

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }

    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }


})

module.exports = { protect }