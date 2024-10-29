require("dotenv").config();
const connectDb = require("./config/db");
const express = require("express");
const cors =require('cors')

const productsRoutes = require("./routes/productsRoutes");
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

const app = express();
// const port = process.env.PORT;

//middle wares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();


app.use(adminRoutes)
app.use(userRoutes)
app.use(productsRoutes)
app.use(cartRoutes)
app.use(orderRoutes)
app.use(paymentRoutes)


// app.listen(port, () => {
//     console.log(`server is running on http://locashost/${port}`);
// });


module.exports = app;