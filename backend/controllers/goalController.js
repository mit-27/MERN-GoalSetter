// Here we define functions which execute based on API requests

// @desc Get goals
// @route GET /api/goal
// @access PRIVATE
const getGoals = (req, res) => {
    res.status(200).json({ message: 'Goals Read' })
}

// @desc Set goal
// @route PUT /api/goal
// @access PRIVATE
const setGoal = (req, res) => {
    if (!req.body.text) {
        res.status(400)
        // to use Express error Handler but we already override it 
        throw new Error("Please add text field")
    }
    res.status(200).json({ message: 'Create Goal' })
}

// @desc Update goal
// @route PUT /api/goal/:id
// @access PRIVATE
const updateGoal = (req, res) => {
    res.status(200).json({ message: `Update Goal for id : ${req.params.id}` })
}

// @desc Delete goal
// @route DELETE /api/goal/:id
// @access PRIVATE
const deleteGoal = (req, res) => {
    res.status(200).json({ message: `Delete Goal for id : ${req.params.id}` })
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}