const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema({
  post: { type: String, require: true, ref: "Blog" },
  author: { type: String, require: true, ref: "User" },
  content: { type: String, require: true },
  reported_by: { type: String, ref: "User" },
  reported_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

module.exports = mongoose.model("Report", Report);
