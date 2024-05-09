// Banner routes
const express = require("express");
const router = express.Router();
const Banner = require("../model/bannerModule");

// GET /banner
router.get("/", async (req, res) => {
  try {
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
    return res.status(400).json({ error: "Invalid ID" });
  }
});

// POST /banner
router.post("/newBanner", async (req, res) => {
  const { img } = req.body;
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
    const result = await Banner.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Delete successful" });
    } else {
      res.status(404).json({ message: "Banner not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT /banner/:id

router.put("/put/:id", async (req, res) => {
  const { img } = req.body;
  const id = req.params.id;
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
      console.log("Update successful");
      res.json({ message: "Update successful", updateBanner: result });
    } else {
      console.log("Banner not found");
      res.status(404).json({ message: "Banner not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
