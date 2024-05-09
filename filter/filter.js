const express = require("express");
const router = express.Router();
const Product = require("../model/productModel");

// Kategoriya bo'yicha mahsulotlarni topish
router.get("/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


