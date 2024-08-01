// Banner routes
const express = require("express");
const router = express.Router();
const Media = require("../model/mediaModule");

// GET /banner
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== "9876543210") {
      return res.status(401).json({ error: "No unauthorized access" });
    }
    const banners = await Media.find();
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
router.post("/newMedia", async (req, res) => {
  const { img } = req.body;
  const authHeader = req.headers.authorization;
  if (authHeader !== "9876543210") {
    return res.status(401).json({ error: "No unauthorized access" });
  }
  try {
    const newMedia = new Media({
      img,
    });

    await newMedia.save();
    res.json({ message: "Medias added", newMedia });
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
    const result = await Media.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Oʻchirish muvaffaqiyatli" });
    } else {
      res.status(404).json({ message: "Media topilmadi" });
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

    const result = await Media.findByIdAndUpdate(
      id,
      { $set: updateBanner },
      { new: true }
    );

    if (result) {
      res.json({ message: "Yangilanish muvaffaqiyatli", updateBanner: result });
    } else {
      res.status(404).json({ message: "Media topilmadi" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverdagi ichki xatolik" });
  }
});

module.exports = router;
