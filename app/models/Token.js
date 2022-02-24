const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Token = new Schema({
  user: {
    type: String, // id user
  },
  refreshToken: { type: String }, // refresh token
  status: {
    type: String,
    enum: ["active", "disabled"], // trang thai
    default: "active",
  },
  expiredAt: {
    type: Date, // thoi gian het han
  },
});

module.exports = mongoose.model("Token", Token);
