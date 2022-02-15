const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema({
  title: { type: String, require: true },
  author: { type: String, require: true, ref: "User" },
  img: { type: String },
  content: { type: String, require: true },
  topic: { type: String, default: "others" },
  status: { type: String, enum: ["disable", "enable"], default: "disable" },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Blog", Blog);
