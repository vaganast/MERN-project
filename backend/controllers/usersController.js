const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc get all users
// @route GET /users
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users) {
        return res.status(400).json({ message: 'No users found'})
    }
    res.json(users)
})

// @desc create new user
// @route POST /users
// @access private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    //confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    //Check for duplicates
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username'})
    }

    //Hash password
    const hashedPwd = await bcrypt.hash(password, 10) //salt rounds

    const userObject = { username, "password": hashedPwd, roles}

    //Create and store new user
    const user = await User.create(userObject)

    if (user) { //created
        res.status(201).json({ message: `New user ${username} created`})
    } else {
        res.status(400).json({ message: 'Invalid user data received'})
    }
})

// @desc update a user
// @route PATCH /users
// @access private
const updateUser = asyncHandler(async (req, res) => {
    
})

// @desc delete a user
// @route DELETE /users
// @access private
const deleteUser = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}