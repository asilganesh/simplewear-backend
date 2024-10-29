const express = require('express')
const { getAllProducts, addProduct, updateProduct, deleteProduct, getProductById } = require('../controllers/productsController')
const verifyToken = require('../middleware/authMiddleware')
const verifyAdmin = require('../middleware/verifyAdminMiddleware')



const router = express.Router()

router
    .get('/products',getAllProducts)
    .get('/products/:id',getProductById)
    .post('/addProduct',verifyAdmin, addProduct)
    .put('/updateProduct/:id',verifyAdmin, updateProduct)
    .delete('/deleteProduct',verifyAdmin, deleteProduct)


module.exports = router