const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRouter = require("../auth/register");
const users = require("../auth/user");
const productRouter = require("../product");
const bannerRouter = require("../banner/index");
const loginRouter = require("../auth/login");
const filterRouter = require("../filter/filter");
const sortRouter = require("../filter/sort");
const pagenationRouter = require("../pagination/index");
const searchRouter = require("../search/index");
const { MONGO_URI } = require("../api/index");

const app = express();

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use routers
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/users", users);
app.use("/products", productRouter);
app.use("/banners", bannerRouter);
app.use("/filter", filterRouter);
app.use("/sort", sortRouter);
app.use("/search", searchRouter);
app.use("/pagination", pagenationRouter);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
