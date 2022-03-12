// Here we define functions which execute based on API requests



// Package Use: If any error get in below functions it automatically call error Handler
// Alternative to try and catch block
const asyncHandler = require('express-async-handler')

// Import Model
const Goal = require('../models/goalModel')

// @desc Get goals
// @route GET /api/goal
// @access PRIVATE
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({})
    res.status(200).json(goals)
})

// @desc Set goal
// @route PUT /api/goal
// @access PRIVATE
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        // to use Express error Handler but we already override it 
        throw new Error("Please add text field")
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

// @desc Update goal
// @route PUT /api/goal/:id
// @access PRIVATE
const updateGoal = asyncHandler(async (req, res) => {
    // first find doc using id
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Please provide valid id")
    }

    // update fetched doc
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })


    res.status(200).json(updatedGoal)
})

// @desc Delete goal
// @route DELETE /api/goal/:id
// @access PRIVATE
const deleteGoal = asyncHandler(async (req, res) => {
    // first find doc using id
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Please provide valid id")
    }

    await goal.remove()

    // Also below can use
    // const deletedGoal = await Goal.findByIdAndRemove(req.params.id)


    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}