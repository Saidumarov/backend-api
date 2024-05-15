// Register routes
const express = require("express");
const router = express.Router();
const Register = require("../model/registerModel");

// POST /register
router.post("/register", async (req, res) => {
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

// const express = require("express");
// const router = express.Router();
// const Register = require("../model/registerModel");
// const nodemailer = require("nodemailer");

// // Nodemailer yordamida e-pochta yuborish
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "saidumarovjafarxon@gmail.com", // Sizning e-pochta manzilingiz
//     pass: "2006jafarxon", // Sizning e-pochta parolingiz
//   },
// });

// // POST /register
// router.post("/newUser", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const register = new Register({
//       name,
//       email,
//       password,
//     });

//     // Tasdiqlash kodi generatsiyasi
//     const randomCode = Math.floor(1000 + Math.random() * 9000); // 4 xonali raqam
//     register.code = randomCode;

//     await register.save();

//     // Tasdiqlash kodi jo'natish
//     const mailOptions = {
//       from: "s", // Sizning e-pochta manzilingiz
//       to: email,
//       subject: "Account Verification Code",
//       text: `Your verification code is: ${randomCode}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send("Error sending email");
//       } else {
//         console.log("Verification code sent: " + info.response);
//         res.json({ message: "Register successful", data: register });
//       }
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // DELETE /register/:id
// router.delete("/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const result = await Register.findByIdAndDelete(id);

//     if (result) {
//       res.status(200).json({ message: "Delete successful" });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // PUT /register/:id
// router.put("/put/:id", async (req, res) => {
//   const { name, email, password } = req.body;
//   const id = req.params.id;

//   try {
//     const updateRegister = {
//       name,
//       email,
//       password,
//     };

//     const result = await Register.findByIdAndUpdate(
//       id,
//       { $set: updateRegister },
//       { new: true }
//     );

//     if (result) {
//       console.log("Update successful");
//       res.json({ message: "Update successful", data: result });
//     } else {
//       console.log("User not found");
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;

// xabar yuborish

// const express = require('express');
// const nodemailer = require('nodemailer');
// const app = express();

// // Express middleware for parsing JSON bodies
// app.use(express.json());

// // Endpoint for sending email
// app.post('/send-email', async (req, res) => {
//     try {
//         // Extracting email details from the request body
//         const { to, subject, text } = req.body;

//         // Creating a transporter
//         let transporter = nodemailer.createTransport({
//             service: 'Gmail', // You can use any email service here
//             auth: {
//                 user: 'your-email@gmail.com', // Sender email
//                 pass: 'your-password' // Sender password
//             }
//         });

//         // Defining email options
//         let mailOptions = {
//             from: 'your-email@gmail.com', // Sender address
//             to: to, // List of receivers
//             subject: subject, // Subject line
//             text: text // Plain text body
//         };

//         // Sending email
//         let info = await transporter.sendMail(mailOptions);
//         console.log("Email sent: ", info.response);

//         res.status(200).json({ message: 'Email sent successfully' });
//     } catch (error) {
//         console.error("Error while sending email: ", error);
//         res.status(500).json({ error: 'Failed to send email' });
//     }
// });

// // Server listening
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
