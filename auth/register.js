const express = require("express");
const router = express.Router();
const Register = require("../model/registerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JWT tokenini yaratish funksiyasi
function generateJWTToken(userId) {
  const secretKey = "your_secret_key_here";
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  return token;
}

// POST /register
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Taqdim etilgan elektron pochtaga ega foydalanuvchi  mavjudligini tekshiring
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Bu emailga ega foydalanuvchi allaqachon mavjud" });
    }

    // Parolni xash qiling
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yangi Register ob'ektini yarating
    const register = new Register({
      name,
      email,
      password: hashedPassword, // Kriptografik xashlangan parolni saqlash
    });

    // Yangi Register obyektini saqlang
    await register.save();

    // Foydalanuvchi idsini oling
    const _id = register._id;

    // JWT tokenini yarating
    const token = generateJWTToken(_id);

    // Muvaffaqiyatli xabar, ma'lumot va token bilan javob yuborish
    res.json({
      message: "Ro'yxatdan muvaffaqiyatli o'tildi ",
      data: { name, email, _id, token },
    });
  } catch (err) {
    // Xato javobini yuborish
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
