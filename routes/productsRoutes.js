const express = require('express')
const { getAllProducts, addProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/productsController')



const router = express.Router()

router
    .get('/products', getAllProducts)
    .get('/products/:id',getProductById)
    .post('/addProduct', addProduct)
    .put('/updateProduct/:id', updateProduct)
    .delete('/deleteProduct', deleteProduct)


module.exports = router