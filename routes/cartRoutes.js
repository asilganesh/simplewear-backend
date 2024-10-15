const express = require('express')
const { addItemToCart, getItemsFromCart, deleteItemFromCart, updateCart } = require('../controllers/cartController')

const router = express.Router()


router
.get('/getCartItems',getItemsFromCart)
.post('/addToCart',addItemToCart)
.put('/updateCartItem',updateCart)
.delete('/removeItem',deleteItemFromCart)

module.exports = router