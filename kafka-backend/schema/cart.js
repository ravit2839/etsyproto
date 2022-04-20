const mongoose = require("mongoose");
const Users = require("./user");
const Items = require("./item");

var schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Users,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Items,
  },
  qty: {
    type: Number,
    default: null,
  },
});

const Cart = mongoose.model("Cart", schema);

module.exports = Cart;
