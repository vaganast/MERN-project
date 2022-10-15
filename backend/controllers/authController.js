const User = require('../models/User')
const bcrypt = require('bcrypt') //for decr the password so we can compare
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc login
// @route post /auth
// @access public
const login = asyncHandler(async (req, res) => {

})

// @desc Refresh
// @route get /auth/refresh
// @access public cause access token has expired
const refresh = (req, res) => {

}

// @desc logout
// @route post /auth/logout
// @access public just to clear cookie if exists
const logout = (req, res) => {

}

module.exports = {
    login,
    refresh,
    logout
}