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

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    // Here we say that route other than API routes (which mentioned in 16 & 17) 
    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    )
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

// Add new errorHandler middleware - which overwrites express default error Handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server has started on port ${port}`))