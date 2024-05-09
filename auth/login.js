const express = require("express");
const Register = require("../model/registerModel");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Foydalanuvchini topish
    const user = await Register.findOne({ email, password });

    // Foydalanuvchini tekshirish
    if (user) {
      // Foydalanuvchi mavjud
      res
        .status(200)
        .json({ message: "Foydalanuvchi muvaffaqiyatli kirdi", data: user });
    } else {
      // Foydalanuvchi topilmadi
      res.status(401).json({ message: "Email yoki parol noto'g'ri" });
    }
  } catch (error) {
    // Xatolikni qaytarish
    console.error(error.message);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;
