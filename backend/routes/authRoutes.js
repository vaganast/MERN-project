const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/') // /auth
    .post()

router.route('/refresh') //routeUrl/auth/refresh
    .get()

router.route('/logout')
    .post()

module.exports = router