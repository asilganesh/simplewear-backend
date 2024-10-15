const mongoose = require('mongoose')

const cartItems = new mongoose.Schema({
    userId:{
        type:String,
        requied:true
    },
    productId: {
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    productSize: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    productImage: {
        type: Array,
        required: true
    }
}) 

module.exports = mongoose.model('Cart',cartItems)