const express = require("express");
const Router = express.Router();

const { getProducts, createProducts, updateProduct, deleteProduct } = require("../controllers/productController");
Router.get("/getProducts", getProducts);
Router.post('/postProducts',createProducts);
Router.patch('/edit-product/:id',updateProduct);
Router.delete('/delete-product/:id',deleteProduct);
module.exports = Router;
