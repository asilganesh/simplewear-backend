const products = require("../models/Products");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const data = await products.find();
      res.status(200).json(data);
    } catch (err) {
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
        res.status(404).json({ message: "Product Not Fount" });
      }
      res.status(200).json({ responseData });
    } catch (err) {
      res
        .status(500)
        .json({ messasge: "Error fetching Product", error: err.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const data = req.body;

      const responseData = await products.create(data);
      res.status(201).json({
        message: "Product added successfully",
        product: responseData,
      });
    } catch (err) {
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
        res
          .status(404)
          .json({ message: "Product not fount or no changes made" });
      }
      res
        .status(200)
        .json({ message: "Product Updated Successfully", data: responseData });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error Updating the product", error: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const data = req.body;
      const responseData = await products.deleteOne(data);

      res
        .status(200)
        .json({ message: "Product Deleted Successfully", data: responseData });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Product Deletion Failed", error: err.message });
    }
  },
};
