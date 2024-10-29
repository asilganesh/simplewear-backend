const products = require("../models/Products");

module.exports = {
  getAllProducts: async (req, res) => {

    try {
      const filters = req.query.filter || {}
      console.log(req.query)
      const { sort } = req.query
      const data = await products.find(filters).sort(sort ? { price: sort.$eq } : null);
      return res.status(200).json(data);
    } catch (err) {
      console.error('Cause:', err.cause);
      res
        .status(500)
        .json({ message: "Error fetching products", error: err.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const responseData = await products.findOne({ _id: id });

      if (!responseData) {
        return res.status(404).json({ message: "Product Not Fount" });
      }
      return res.status(200).json({ responseData });
    } catch (err) {
      console.error('Cause:', err.cause);
      res
        .status(500)
        .json({ messasge: "Error fetching Product", error: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const data = req.body;

      const responseData = await products.create(data);
      return res.status(201).json({
        message: "Product added successfully",
        product: responseData,
      });
    } catch (err) {
      console.error('Cause:', err.cause);
      res
        .status(500)
        .json({ message: "Error adding the product", error: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const responseData = await products.updateOne({ _id: id }, data);
      if (responseData.modifiedCount === 0) {
        return res
          .status(404)
          .json({ message: "Product not fount or no changes made" });
      }
      return res
        .status(200)
        .json({ message: "Product Updated Successfully", data: responseData });
    } catch (err) {
      console.error('Cause:', err.cause);
      res
        .status(500)
        .json({ message: "Error Updating the product", error: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      console.log(req.body)
      const { productId } = req.body;
      const responseData = await products.deleteOne({ _id: productId });

      console.log(responseData)

      if (!responseData.deletedCount) {
        return res.status(404).json({ message: "Product not found" })
      }

      const updatedData = await products.find()

      return res
        .status(200)
        .json({ message: "Product Deleted Successfully", data: updatedData });
    } catch (err) {
      console.error('Cause:', err.cause);
      res
        .status(500)
        .json({ message: "Product Deletion Failed", error: err.message });
    }
  },
};
