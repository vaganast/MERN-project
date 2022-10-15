const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

router.route('/') // /auth
    .post(loginLimiter, authController.login)

router.route('/refresh') //routeUrl/auth/refresh
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

module.exports = router