// productModel.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  user: Object,
  titel: String,
  imgags: Object,
  description: String,
  realPrice: Number,
  oldPrice: Number,
  perMonth: Number,
  piece: Number,
  category: String,
  brend: String,
  isDiscounts: Boolean,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;


