const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Token = new Schema({
  user: {
    type: String,
  },
  refreshToken: { type: String },
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
