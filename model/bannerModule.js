// bannerModel.js
const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  img: String,
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
