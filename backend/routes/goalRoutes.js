const express = require('express')
const router = express.Router()

// using router get we only provide / as api/goals/ specified in server.js using app.use('route string',this file)

const { protect } = require('../middleware/authMiddleware')


// Importing controllers to execute action specified in controller folder based on API
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

// Here get and Post have same route so we could combine it
router.route('/').get(protect, getGoals).post(protect, setGoal)

// Here we use get to Read goals
// router.get('/', getGoals)

// Here we use post to create goal
// router.post('/', setGoal)

// put and delete have same route so combine it
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

// Here we use put to update the goal for specified id in url
// router.put('/:id', updateGoal)

// Here we use delete to delete goal
// router.delete('/:id', deleteGoal)

module.exports = router