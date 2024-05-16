const express = require("express");
const router = express.Router();
const Product = require("../model/productModel");

// Qidiruv bo'yicha mahsulotlarni topish
router.get("/", async (req, res) => {
  const query = req.query.query.trim();

  try {
    // Mahsulotlarni qidirish
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { titel: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { brend: { $regex: query, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
