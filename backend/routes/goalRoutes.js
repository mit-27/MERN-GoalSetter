const express = require('express')
const route = express.Router()

// using router get we only provide / as api/goals/ specified in server.js using app.use('route string',this file)

// Here we use get to Read goals
route.get('/', (req, res) => {
    res.status(200).json({ message: 'Goals Read' })
})

// Here we use post to create goal
route.post('/', (req, res) => {
    res.status(200).json({ message: 'Create Goal' })
})

// Here we use put to update the goal for specified id in url
route.put('/:id', (req, res) => {
    res.status(200).json({ message: `Update Goal for id : ${req.params.id}` })
})

// Here we use delete to delete goal
route.delete('/:id', (req, res) => {
    res.status(200).json({ message: `Delete Goal for id : ${req.params.id}` })
})

module.exports = route