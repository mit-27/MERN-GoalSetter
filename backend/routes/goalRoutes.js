const express = require('express')
const route = express.Router()

// using router get we only provide / as api/goals/ specified in server.js using app.use('route string',this file)

// Importing controllers to execute action specified in controller folder based on API
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

// Here we use get to Read goals
route.get('/', getGoals)

// Here we use post to create goal
route.post('/', setGoal)

// Here we use put to update the goal for specified id in url
route.put('/:id', updateGoal)

// Here we use delete to delete goal
route.delete('/:id', deleteGoal)

module.exports = route