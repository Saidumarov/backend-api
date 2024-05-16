const express = require("express");
const Register = require("../model/registerModel");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Foydalanuvchini topish
    const user = await Register.findOne({ email });

    // Foydalanuvchini tekshirish
    if (user) {
      // Kriptografik xashlashdan o'tkazish va parolni tekshirish
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Foydalanuvchi mavjud va parol to'g'ri
        res
          .status(200)
          .json({ message: "Foydalanuvchi muvaffaqiyatli kirdi", data: user });
      } else {
        // Foydalanuvchi mavjud, lekin parol noto'g'ri
        res.status(401).json({ message: "Parol noto'g'ri" });
      }
    } else {
      // Foydalanuvchi topilmadi
      res.status(401).json({ message: " Foydalanuvchi topilmadi" });
    }
  } catch (error) {
    // Xatolikni qaytarish
    console.error(error.message);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;
