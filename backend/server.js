const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

// Here we use route which define in routes folder 
app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => console.log(`Server has started on port ${port}`))