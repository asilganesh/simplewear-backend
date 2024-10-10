const express = require('express')
const { loginAdmin, registerAdmin } = require('../controllers/adminController')


const router = express.Router()

router
.get('/adminLogin',loginAdmin)
.post('/registerAdmin',registerAdmin)

module.exports = router