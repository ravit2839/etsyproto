const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemCategory",
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
  salesCount: {
    type: Number,
    default: 0,
  },
  featuredImage: String,
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
