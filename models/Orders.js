const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            productName: String,
            productSize: String,
            productQuantity: Number,
            productPrice: Number,
            totalPrice: Number,
            productImage: Array
        }
    ],
    deliveryDetails: {
        fname: String,
        lname: String,
        email: String,
        street: String,
        city: String,
        state: String,
        zipcode: Number,
        country: String,
        phone: Number
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: [ 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Confirmed',
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
    paymentMethod: {
        type: String,
        // enum: ['Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'COD'],
        enum: ['RAZORPAY', 'COD'],
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    deliveryDate: {
        type: Date,
        default: () => {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 7);  
            return currentDate;
        },
    },
});

module.exports  = mongoose.model('Orders', orderSchema);


