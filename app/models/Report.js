const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema({
  post: { type: String, require: true },
  author: { type: String, require: true },
  content: { type: String, require: true },
  reported_by: { type: String },
  reported_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Report", Report);
