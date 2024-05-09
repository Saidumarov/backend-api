const express = require("express");
const router = express.Router();
const Product = require("../model/productModel");

// Pagination bo'yicha mahsulotlarni topish
router.get("/", async (req, res) => {
  let page = parseInt(req.query.page) || 1; // Sahifa raqami (boshqa sahifalarda bo'lishi mumkin)
  let limit = parseInt(req.query.limit) || 10; // Mahsulotlar soni limiti

  try {
    // Barcha mahsulotlar sonini hisoblash
    const totalProducts = await Product.countDocuments();

    // Offset (boshlang'ich mahsulot indeksi) ni hisoblash
    const startIndex = (page - 1) * limit;

    // Mahsulotlarni olish va limit va offset orqali sahifalash
    const products = await Product.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ realPrice: 1 });

    res.json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

