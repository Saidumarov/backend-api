const express = require("express");
const router = express.Router();
const Register = require("../model/registerModel");
const bcrypt = require("bcrypt");

// GET / users
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== "12345678") {
      return res.status(401).json({ error: "Ruxsatsiz kirish yo'q" });
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
    return res.status(400).json({ error: "Yaroqsiz ID" });
  }

  if (authHeader !== "12345678") {
    return res.status(401).json({ error: "Ruxsatsiz kirish yo'q" });
  }

  try {
    const register = await Register.findById(id);

    if (!register) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }

    res.json(register);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:id
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Register.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Oʻchirish muvaffaqiyatli" });
    } else {
      res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverdagi ichki xatolik" });
  }
});

// PUT /users/:id
router.put("/put/:id", async (req, res) => {
  const { name, email, password, new_password } = req.body;
  const id = req.params.id;

  try {
    // Foydalanuvchini topish
    const user = await Register.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    // Kiritilgan parol va yangi parolni solishtirish
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Agar kiritilgan parol yangi parolga teng bo'lsa, foydalanuvchi ma'lumotlarini yangilash
      const hashedNewPassword = await bcrypt.hash(new_password, 10);
      user.name = name;
      user.email = email;
      user.password = hashedNewPassword;
      await user.save();
      console.log("Update successful");
      res.json({ message: "Update successful", data: user });
    } else {
      // Agar kiritilgan parol yangi parolga teng bo'lmagan bo'lsa, "parol noto'g'ri" xabarnomasi qaytariladi
      res.status(401).json({ message: "Parol noto'g'ri" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Serverdagi ichki xatolik" });
  }
});

module.exports = router;
