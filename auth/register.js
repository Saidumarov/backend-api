// Register routes
const express = require("express");
const router = express.Router();
const Register = require("../model/registerModel");

// POST /register
router.post("/newUser", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const register = new Register({
      name,
      email,
      password,
    });

    await register.save();
    res.json({ message: "Register successful", data: register });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /register/:id
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Register.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Delete successful" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT /register/:id
router.put("/put/:id", async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.params.id;

  try {
    const updateRegister = {
      name,
      email,
      password,
    };

    const result = await Register.findByIdAndUpdate(
      id,
      { $set: updateRegister },
      { new: true }
    );

    if (result) {
      console.log("Update successful");
      res.json({ message: "Update successful", data: result });
    } else {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;


