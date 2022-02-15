const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Lesson = new Schema({
  course: { type: String, require: true },
  name: { type: String, require: true },
  link: { type: String },
  excercises: [],
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
  deleted_at: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Lesson", Lesson);
