// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const registerRouter = require("./auth/register");
// const users = require("./auth/user");
// const productRouter = require("./product");
// const bannerRouter = require("./banner/index");
// const loginRouter = require("./auth/login");
// const filterRouter = require("./filter/filter");
// const sortRouter = require("./filter/sort");
// const pagenationRouter = require("./pagination/index");
// const searchRouter = require("./search/index");
// const { MONGO_URI } = require("./api/index");

// const app = express();

// // Config
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Use routers
// app.use("/register", registerRouter);
// app.use("/login", loginRouter);
// app.use("/users", users);
// app.use("/products", productRouter);
// app.use("/banners", bannerRouter);
// app.use("/filter", filterRouter);
// app.use("/sort", sortRouter);
// app.use("/search", searchRouter);
// app.use("/pagination", pagenationRouter);

// // Port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// 3hq0F4dsnamY2POo
// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(
  `mongodb+srv://saidumarovjafarxon:3hq0F4dsnamY2POo@cluster0.com3cmr.mongodb.net/?retryWrites=true&w=majority`
);
// Data schema for contacts
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Data model for contacts
const Contact = mongoose.model("Contact", contactSchema);
// Data schema for products
const productSchema = new mongoose.Schema({
  name: String,
  user: Object,
  titel: String,
  imgags: Object,
  description: String,
  realPrice: Number,
  oldPrice: Number,
  perMonth: Number,
  piece: Number,
  category: String,
  brend: String,
  isDiscounts: Boolean,
});

// Data model for products
const Product = mongoose.model("Product", productSchema);

// Product routes
app.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/newProduct", async (req, res) => {
  const {
    name,
    user,
    imgags,
    description,
    realPrice,
    piece,
    perMonth,
    oldPrice,
    category,
    titel,
    isDiscounts,
    brend,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      user,
      titel,
      imgags,
      description,
      realPrice,
      piece,
      perMonth,
      oldPrice,
      category,
      isDiscounts,
      brend,
    });

    await newProduct.save();
    res.json({ message: "Product added", newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Product.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Delete successful" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/put/:id", async (req, res) => {
  const {
    name,
    user,
    imgags,
    description,
    realPrice,
    piece,
    perMonth,
    oldPrice,
    category,
    titel,
    isDiscounts,
    brend,
  } = req.body;
  const id = req.params.id;

  try {
    const updateProduct = {
      name,
      user,
      titel,
      imgags,
      description,
      realPrice,
      piece,
      perMonth,
      oldPrice,
      category,
      isDiscounts,
      brend,
    };

    const result = await Product.findByIdAndUpdate(
      id,
      { $set: updateProduct },
      { new: true }
    );

    if (result) {
      console.log("Update successful");
      res.json({ message: "Update successful", updateProduct: result });
    } else {
      console.log("Product not found");
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Contact routes
app.get("/contact", (req, res) => {
  Contact.find()
    .then((contacts) => res.json(contacts))
    .catch((err) => res.status(400).json(err));
});

app.get("/contact/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  Contact.findById(id)
    .then((contact) => {
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/newContact", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      password,
    });

    await newContact.save();
    res.json({ message: "Product added", newContact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/deleteContat/:id", (req, res) => {
  const id = req.params.id;
  Contact.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(200).json({ message: "Delete successful" });
      } else {
        res.status(404).json({ message: "Contact not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.put("/putContact/:id", async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.params.id;

  try {
    const updateProduct = {
      name,
      email,
      password,
    };

    const result = await Contact.findByIdAndUpdate(
      id,
      { $set: updateProduct },
      { new: true }
    );

    if (result) {
      console.log("Update successful");
      res.json({ message: "Update successful", updateProduct: result });
    } else {
      console.log("Product not found");
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});