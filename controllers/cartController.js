const cart = require("../models/Cart");

module.exports = {
    getItemsFromCart: async (req, res) => {
        try {
            const { userId } = req.query;

            const responseData = await cart.find({ userId });

            if (!responseData) {
                res.status(404).json({ message: "Cart is Empty" });
            }

            res.status(200).json(responseData);
        } catch (err) {
            res.status(500).json({ message: "Error Ocurred", error: err.message });
        }
    },

    addItemToCart: async (req, res) => {
        try {
            const data = req.body;



            const productExists = await cart.findOne({
                userId: data.userId,
                productId: data.productId,
                productSize: data.productSize
            });

            // if (!userCart.length) {
            //     const responseData = await cart.create(data);
            //     return res.status(201).json({
            //         message: "Cart created and item added successfully",
            //         data: responseData
            //     });
            // }

            if (!productExists) {
                const responseData = await cart.create(data);
                const updatedCart = await cart.find({ userId: data.userId });
                return res.status(201).json({
                    message: "Item added to cart successfully",
                    data: updatedCart
                });
            }

            const updatedData = {
                productQuantity: productExists.productQuantity + 1,
                totalPrice: productExists.productPrice * (productExists.productQuantity + 1)
            };

            const updatedCartItem = await cart.findByIdAndUpdate(
                { _id: productExists._id },
                updatedData,
                { new: true }
            );



            const updatedCart = await cart.find({ userId: data.userId });

            return res.status(201).json({
                message: "Item quantity updated successfully",
                data: updatedCart
            });

        } catch (err) {
            res.status(500).json({ message: "Error occurred", error: err.message });
        }


    },

    updateItemSize: async (req, res) => {
        try {
            const data = req.body;

            const productExists = await cart.findOne({
                userId: data.userId,
                productId: data.productId,
                productSize: data.productSize
            });


            if (!productExists) {
                const newSize = { productSize: data.productSize }
                const responseData = await cart.findOneAndUpdate({ _id: data._id }, newSize,
                    { new: true });
                const updatedCart = await cart.find({ userId: data.userId });

                return res.status(200).json({ message: "updated Item Successfully", data: updatedCart })

            }

            const updatedData = { ...productExists.toObject(), productQuantity: productExists.productQuantity + data.productQuantity, totalPrice: productExists.totalPrice + data.totalPrice }

            const responseData = await cart.findOneAndUpdate(productExists._id, updatedData, { new: true })

            if (responseData) {
                const removeItem = await cart.findByIdAndDelete({ _id: data._id });
                const updatedCart = await cart.find({ userId: data.userId });

                return res.status(200).json({ message: "updated Item Successfully", data: updatedCart })
            }

        } catch (err) {
            res.status(500).json({ message: "Error occurred", error: err.message });
        }
    },

    updateItemQuantity: async (req, res) => {

        try {
            const { cartId, userId, newQuantity } = req.body

            if (!cartId) {
                return res.status(404).json("Please provide the cartID")
            }

            if (!newQuantity) {
                return res.status(404).json("Please provide the newQuantity")
            }

            const cartItem = await cart.find({ _id: cartId })

            const updatedData = { productQuantity: newQuantity, totalPrice: cartItem[0].productPrice * newQuantity }

            const responseData = await cart.findByIdAndUpdate({ _id: cartId }, updatedData)

            const updatedCart = await cart.find({ userId });

            return res.status(200).json({ message: " Updated quantity successfully", data: updatedCart })

        }
        catch (err) {
            res.status(500).json({ message: "Error Ocurred", error: err.message })
        }
    },

    clearCart: async(req,res) => {

        try{
            const {userId}=req.body
            const responseData = await cart.deleteMany({userId})
            return res.status(200).json({message: "Clear Cart", data: responseData})

        }
        catch(err) {
            res.status(500).json({message: "Error ocurred", error: err.message})
        }
    },

    deleteItemFromCart: async (req, res) => {
        try {
            const { cartId, userId } = req.body;
            console.log(cartId);
            const responseData = await cart.findByIdAndDelete(cartId);
            if (!responseData) {
                res
                    .status(404)
                    .json({ message: "No item found with the provided Cart ID" });
            }

            const updatedCart = await cart.find({ userId });

            res
                .status(200)
                .json({ message: "Item Deleted from cart", data: updatedCart });
        } catch (err) {
            res.status(500).json({ message: "Error Ocurred", error: err });
        }
    },
};
