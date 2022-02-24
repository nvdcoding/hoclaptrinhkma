const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Excercise = new Schema({
  lesson: { type: String, require: true }, // id bai hoc cua bai tap
  question: { type: String, require: true }, // de bai
  description: { type: String }, // mo ta
  cases: [], // Mang cac tesst case
});

module.exports = mongoose.model("Excercise", Excercise);
