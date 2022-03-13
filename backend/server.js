const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const app = express()

connectDB()

// To use req.body we have to add below body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Here we use route which define in routes folder 
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Add new errorHandler middleware - which overwrites express default error Handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server has started on port ${port}`))