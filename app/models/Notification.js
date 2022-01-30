const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notification = new Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  user: { type: String, require: true },
  created_by: { type: String },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Notification", Notification);
