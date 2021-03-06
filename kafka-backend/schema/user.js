const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  username: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  fullAddress: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  dob: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  profilePic: {
    type: String,
    default: null,
  },
  about: {
    type: String,
    default: null,
  },
  shopName: {
    type: String,
    default: "",
    unique: false,
  },
  shopImage: {
    type: String,
    default: null,
  },
});

const Users = mongoose.model("Users", schema);

module.exports = Users;
