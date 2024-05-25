// Banner routes
const express = require("express");
const router = express.Router();
const Banner = require("../model/bannerModule");

// GET /banner
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== "9876543210") {
      return res.status(401).json({ error: "No unauthorized access" });
    }
    const banners = await Banner.find();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /banner/:id

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Yaroqsiz ID" });
  }
});

// POST /banner
router.post("/newBanner", async (req, res) => {
  const { img } = req.body;
  const authHeader = req.headers.authorization;
  if (authHeader !== "9876543210") {
    return res.status(401).json({ error: "No unauthorized access" });
  }
  try {
    const newBanner = new Banner({
      img,
    });

    await newBanner.save();
    res.json({ message: "Banner added", newBanner });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /banner/:id

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== "9876543210") {
      return res.status(401).json({ error: "No unauthorized access" });
    }
    const result = await Banner.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Oʻchirish muvaffaqiyatli" });
    } else {
      res.status(404).json({ message: "Banner topilmadi" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverdagi ichki xatolik" });
  }
});

// PUT /banner/:id
router.put("/put/:id", async (req, res) => {
  const { img } = req.body;
  const id = req.params.id;
  const authHeader = req.headers.authorization;
  if (authHeader !== "9876543210") {
    return res.status(401).json({ error: "No unauthorized access" });
  }
  try {
    const updateBanner = {
      img,
    };

    const result = await Banner.findByIdAndUpdate(
      id,
      { $set: updateBanner },
      { new: true }
    );

    if (result) {
      res.json({ message: "Yangilanish muvaffaqiyatli", updateBanner: result });
    } else {
      res.status(404).json({ message: "Banner topilmadi" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverdagi ichki xatolik" });
  }
});

module.exports = router;
