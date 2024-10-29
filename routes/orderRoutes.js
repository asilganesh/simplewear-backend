const express = require('express')
const { getOrdersList, addOrders, updateOrdersList, getAllOrders } = require('../controllers/ordersController')
const verifyToken = require('../middleware/authMiddleware')
const verifyAdmin = require('../middleware/verifyAdminMiddleware')
const router = express.Router()

router
.get('/getAllOrders',verifyAdmin,getAllOrders)
.get('/getOrders',verifyToken,getOrdersList)
.post('/addOrders',addOrders)
.put('/updateOrder',verifyAdmin,updateOrdersList)


module.exports = router