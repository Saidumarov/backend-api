const express = require("express");
const router = express.Router();
const Register = require("../model/registerModel");

// GET / users
router.get("/", async (req, res) => {
  try {
    const register = await Register.find();
    res.json(register);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET / users/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const register = await Register.findById(id);

    if (!register) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(register);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


