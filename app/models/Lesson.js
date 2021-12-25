const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lesson = new Schema({
  name: { type: String, require: true },
  part: { type: String },
  link: { type: String },
  comments: [],
  exercises: [],
});


module.exports = mongoose.model('Lesson', Lesson);