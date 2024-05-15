const express = require("express");
const router = express.Router();
const Register = require("../model/registerModel");

// GET / users
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== "12345678") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const register = await Register.find();
    res.json(register);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET / users/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const authHeader = req.headers.authorization;

  if (!id) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (authHeader !== "12345678") {
    return res.status(401).json({ error: "Unauthorized" });
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
