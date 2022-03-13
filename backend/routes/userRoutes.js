const express = require('express')

const router = express.Router()

// controller to perform action on route requests
const { registerUser, loginUser, getMe } = require('../controllers/userController')

// Importing protect middleware
const { protect } = require('../middleware/authMiddleware')

// routes for User
router.post('/', registerUser)
router.post('/login', loginUser)

// Here we wanna use protect middleware so just add it as second argument
router.get('/me', protect, getMe)


module.exports = router