// Product routes
const express = require("express");
const router = express.Router();
const Product = require("../model/productModel");

// GET /products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /product/:id

router.get("/products/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /newProduct
router.post("/newProduct", async (req, res) => {
  const {
    name,
    user,
    imgags,
    description,
    realPrice,
    piece,
    perMonth,
    oldPrice,
    category,
    titel,
    isDiscounts,
    brend,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      user,
      titel,
      imgags,
      description,
      realPrice,
      piece,
      perMonth,
      oldPrice,
      category,
      isDiscounts,
      brend,
    });

    await newProduct.save();
    res.json({ message: "Product added", newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /product/:id

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Product.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Delete successful" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT /product/:id

router.put("/put/:id", async (req, res) => {
  const {
    name,
    user,
    imgags,
    description,
    realPrice,
    piece,
    perMonth,
    oldPrice,
    category,
    titel,
    isDiscounts,
    brend,
  } = req.body;
  const id = req.params.id;

  try {
    const updateProduct = {
      name,
      user,
      titel,
      imgags,
      description,
      realPrice,
      piece,
      perMonth,
      oldPrice,
      category,
      isDiscounts,
      brend,
    };

    const result = await Product.findByIdAndUpdate(
      id,
      { $set: updateProduct },
      { new: true }
    );

    if (result) {
      console.log("Update successful");
      res.json({ message: "Update successful", updateProduct: result });
    } else {
      console.log("Product not found");
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
