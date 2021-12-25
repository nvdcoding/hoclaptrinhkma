const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Token = new Schema({
  user: {
    type: String,
  },
  token: {
    type: String,
    index: true,
  },
  refreshToken: { type: String, unique: true },
  status: {
    type: String,
    enum: ["active", "disabled"],
    default: "active",
  },
  expiredAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Token", Token);