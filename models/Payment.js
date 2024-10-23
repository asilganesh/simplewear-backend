const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({

    orderId: String,
    paymentId: String,
    userId: String,
})

module.exports = mongoose.model('payment',paymentSchema)