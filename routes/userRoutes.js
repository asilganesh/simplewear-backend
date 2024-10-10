const express = require('express')
const { registerUser, loginUser } = require('../controllers/userController')

const router = express.Router()

router
    .get('/userLogin',loginUser)
    .post('/registerUser', registerUser)

module.exports = router