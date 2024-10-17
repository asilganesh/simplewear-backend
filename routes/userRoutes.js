const express = require('express')
const { registerUser, loginUser } = require('../controllers/userController')

const router = express.Router()

router
    .post('/userLogin',loginUser)
    .post('/registerUser', registerUser)

module.exports = router