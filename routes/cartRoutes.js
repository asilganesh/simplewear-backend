const express = require('express')
const { addItemToCart, getItemsFromCart, deleteItemFromCart, updateItemSize, updateItemQuantity, clearCart } = require('../controllers/cartController')
const verifyToken = require('../middleware/authMiddleware')

const router = express.Router()


router
.get('/getCartItems',verifyToken,getItemsFromCart)
.post('/addToCart',verifyToken,addItemToCart)
.put('/updateItemSize',verifyToken,updateItemSize)
.put('/updateItemQuantity',verifyToken,updateItemQuantity)
.delete('/clearCart',clearCart)
.delete('/removeItem',verifyToken,deleteItemFromCart)

module.exports = router