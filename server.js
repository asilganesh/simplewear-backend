require("dotenv").config();
const connectDb = require("./config/db");
const express = require("express");
const productsRoutes = require("./routes/productsRoutes");

const app = express();
const port = process.env.PORT;

//middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app
  .get("/products", productsRoutes)
  .get('/products/:id',productsRoutes)
  .post("/addProduct", productsRoutes)
  .put("/updateProduct/:id", productsRoutes)
  .delete("/deleteProduct", productsRoutes);

app.listen(port, () => {
  console.log(`server is running on http://locashost/${port}`);
});
