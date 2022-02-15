const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
  content: { type: String, require: true },
  post: { type: String, require: true },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Comment", Comment);
