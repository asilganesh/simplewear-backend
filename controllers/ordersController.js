const orders = require('../models/Orders')
const cart = require('../models/Cart')

module.exports = {

    getAllOrders: async(req,res) => {

        try{
            const ordersData = await orders.find().sort({orderDate:-1})
            if(!ordersData) {
                return res.status(400).json("No orders found")
            }
            return res.status(200).json(ordersData)
        }
        catch(err) {
            console.error('Cause:', err.cause);
            return res.status(500).json({message: "Error Ocurred", error: err.message})
        }
    },

    getOrdersList: async(req,res) => {

        try{
            const userId = req.query.userId

            if(!userId){
               return  res.status(400).json("please provide the useid")
            }
            const responseData = await orders.find({userId}).sort({orderDate:-1})

            if(!responseData.length){
                return res.status(400).json("No orders found")
            }

           return  res.status(200).json({message:"Fetched orders successfully",data: responseData})

        }
        catch(err) {
            console.error('Cause:', err.cause);
            res.status(500).json({message: "Error ocurred", error : err.message})
        }

    },

    addOrders: async(req,res) => {

        try{
            const userId = req.body.userId
            console.log(req.body)
            const userCart = await cart.find({userId})
            if (!userCart.length) {
                return res.status(400).json({ message: "Cart is empty" });
            }

           console.log(req.body.deliveryDetails)
            const orderData = {
                userId: userId,
                products: userCart.map(item => ({
                    productId: item.productId,
                    productName: item.productName,
                    productSize: item.productSize,
                    productQuantity: item.productQuantity,
                    productPrice: item.productPrice,
                    totalPrice: item.totalPrice,
                    productImage: item.productImage
                })),
                deliveryDetails: req.body.deliveryDetails,
                totalAmount: req.body.totalAmount,
                paymentMethod: req.body.paymentMethod,
                paymentStatus:req.body.paymentStatus

            };

            const responseData = await orders.create(orderData);
            return res.status(201).json({ message: "Order placed successfully", data: responseData });

        }
        catch(err) {
            console.error('Cause:', err.cause);
            res.status(500).json({message: "Error Ocurred", error: err.message})
        }
    },
    
    updateOrdersList: async(req,res)=> {

        try{

            const orderId = req.body._id
            const orderStatus = req.body.orderStatus
          
            if(orderStatus === 'Delivered'){
                paymentStatus = 'Completed'
            }

            const responseData = await orders.findOneAndUpdate(
                { _id: orderId },
                { orderStatus: orderStatus }, 
                { new: true } 
            );          

       
            const ordersData = await orders.find().sort({orderDate:-1})
            if(!ordersData) {
                return res.status(400).json("No orders found")
            }
            return res.status(200).json(ordersData)

        }
        catch(err) {
            console.error('Cause:', err.cause);
            res.status(500).json({message: "Error Ocurred", error: err.message})
        }
    },
}