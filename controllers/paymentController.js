const payment = require('../models/Payment')
const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


module.exports = {
    createOrder: async (req, res) => {
        console.log("hello")
        try {

            const { amount, currency } = req.body
            const options = {
                amount : amount*100,
                currency
            }

            const order = await razorpayInstance.orders.create(options);
            res.status(200).json({ message: "Created Order",  order })


        }
        catch (err) {
            res.status(500).json({ message: "Error ocurred", error: err.message })
        }
    },
    storePaymentDetails: async (req, res) => {

        try {
            let paymentData = req.body
          
            const responseData = await payment.create(paymentData)

            res.status(201).json({ message: "Payment details stored successfully", data: responseData })

        }
        catch (err) {
            res.status(500).json({ message: "Error ocurred", error: err.message })
        }
    }
}