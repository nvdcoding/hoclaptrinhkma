const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Excercise = new Schema({
  question: { type: String, require: true },
  description: { type: String },
  cases: [],
  answer: String
});


module.exports = mongoose.model('Excercise', Excercise);