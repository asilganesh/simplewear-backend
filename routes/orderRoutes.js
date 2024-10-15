const express = require('express')
const { getOrdersList, addOrders, updateOrdersList } = require('../controllers/ordersController')
const verifyToken = require('../middleware/authMiddleware')
const router = express.Router()

router
.get('/getOrders',verifyToken,getOrdersList)
.post('/addOrders',addOrders)
.put('/updateOrder',updateOrdersList)


module.exports = router