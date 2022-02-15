const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  goal: { type: String, require: true },
  img: { type: String, require: true },
  path: { type: String, require: true, default: "Other" },
  requirement: { type: String },
  lesson: [],
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
  deleted_at: { type: Date, default: null },
});

module.exports = mongoose.model("Course", Course);
