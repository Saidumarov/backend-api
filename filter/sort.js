const express = require("express");
const router = express.Router();
const Product = require("../model/productModel");

router.get("/", async (req, res) => {
  let sortOption = req.query.sort;

  // Default sorting option if not provided
  if (!sortOption) {
    sortOption = "defolt";
  }
  try {
    let products;

    // Fetch products based on sort option
    if (sortOption === "asc") {
      products = await Product.find().sort({ realPrice: 1 });
    } else if (sortOption === "desc") {
      products = await Product.find().sort({ realPrice: -1 });
    } else if (sortOption === "defolt") {
      products = await Product.find();
    } else {
      // Invalid sorting parameter
      return res
        .status(400)
        .json({ message: "Noto'g'ri sortirovka parametri" });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // Kategoriya va sortirovka bo'yicha mahsulotlarni topish
router.get("/:category", async (req, res) => {
  const category = req.params.category;
  let sortOption = req.query.sort; // Sortirovka parametri

  // Sortirovka parametri bo'lmaganda, default holat
  if (!sortOption) {
    sortOption = "defolt";
  }

  try {
    let products;

    // Sortirovka parametri bo'yicha mahsulotlarni topish
    if (sortOption === "asc") {
      products = await Product.find({ category: category }).sort({
        realPrice: 1,
      });
    } else if (sortOption === "desc") {
      products = await Product.find({ category: category }).sort({
        realPrice: -1,
      });
    } else if (sortOption === "defolt") {
      products = await Product.find({ category: category });
    } else {
      // Noto'g'ri sortirovka parametri
      return res
        .status(400)
        .json({ message: "Noto'g'ri sortirovka parametri" });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // Kategoriya va sortirovka bo'yicha mahsulotlarni topish
router.get("/:category/:brend", async (req, res) => {
  const category = req.params.category;
  const brend = req.params.brend;
  let sortOption = req.query.sort; // Sortirovka parametri

  // Sortirovka parametri bo'lmaganda, default holat
  if (!sortOption) {
    sortOption = "defolt";
  }
  try {
    let products;

    // Sortirovka parametri bo'yicha mahsulotlarni topish
    if (sortOption === "asc") {
      products = await Product.find({ category: category, brend: brend }).sort({
        realPrice: 1,
      });
    } else if (sortOption === "desc") {
      products = await Product.find({ category: category, brend: brend }).sort({
        realPrice: -1,
      });
    } else if (sortOption === "defolt") {
      products = await Product.find({ category: category, brend: brend });
    } else {
      // Noto'g'ri sortirovka parametri
      return res
        .status(400)
        .json({ message: "Noto'g'ri sortirovka parametri" });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
