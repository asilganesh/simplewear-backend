const express = require('express')
const { storePaymentDetails, createOrder } = require('../controllers/paymentController')
const router = express.Router()




router
.post('/createOrder', createOrder)
.post('/storePaymentDetails',storePaymentDetails)

module.exports = router