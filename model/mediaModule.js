// bannerModel.js
const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  img: String,
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
