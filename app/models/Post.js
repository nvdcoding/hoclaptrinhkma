const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  title: { type: String, require: true },
  author: { type: String, require: true },
  content: { type: String, require: true },
  status: {
    type: String,
    enum: ["noticed", "normal"],
    default: "normal",
  },
  created_by: { type: String },
  updated_by: { type: String },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", Post);
