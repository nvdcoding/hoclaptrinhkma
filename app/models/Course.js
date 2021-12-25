const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
  name: { type: String, require: true },
  description: { type: String },
  goal: { type: String },
  bio: { type: String },
  requirement: String,
  lesson: [],
});


module.exports = mongoose.model('Course', Course);