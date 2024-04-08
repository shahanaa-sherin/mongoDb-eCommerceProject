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
 
}
module.exports = object;
