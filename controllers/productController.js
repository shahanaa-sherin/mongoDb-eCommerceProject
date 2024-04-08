const product = require("../models/product");

const object = {
  getProducts: async (req, res) => {
    try {
      const products = await product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createProducts: async (req, res) => {
    try {
      const newProduct = new product({
        name: req.body.name,
        price: req.body.price,
      });
      const savedProduct = await newProduct.save();
      res.status(200).json({
        message: "Product added successfully",
        newProduct: savedProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const updateData = req.body;
      console.log(productId, updateData, 'here')
      const updatedProduct = await product.findByIdAndUpdate(
        productId,
        updateData
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res
        .status(200)
        .json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      console.error(error);
    }
  },
  deleteProduct:async(req,res) =>{
    try {
      const productId = req.params.id;
      const deleteData = req.body;
      console.log(productId, deleteData, 'here')
      const deletedProduct = await product.findByIdAndDelete(
        productId,
        deleteData
      );
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res
        .status(200)
        .json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
      console.error(error);
  }
}
}
module.exports = object;
