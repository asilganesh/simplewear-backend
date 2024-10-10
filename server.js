require("dotenv").config();
const connectDb = require("./config/db");
const express = require("express");
const productsRoutes = require("./routes/productsRoutes");
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express();
const port = process.env.PORT;

//middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use(adminRoutes)
app.use(userRoutes)
app.use(productsRoutes)


app.listen(port, () => {
    console.log(`server is running on http://locashost/${port}`);
});
