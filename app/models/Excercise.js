const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Excercise = new Schema({
  lesson: { type: String, require: true },
  question: { type: String, require: true },
  description: { type: String },
  cases: [],
});

module.exports = mongoose.model("Excercise", Excercise);
