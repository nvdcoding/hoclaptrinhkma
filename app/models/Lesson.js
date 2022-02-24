const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Lesson = new Schema({
  course: { type: String, require: true, ref: "Course" }, // Khoa hoc cua bai hoc
  name: { type: String, require: true }, // ten bai
  link: { type: String }, // duong link
  excercises: { type: [], ref: "Excercise" }, // danh sach bai tap cua bai hoc
  created_by: { type: String }, // nguoi tao
  updated_by: { type: String }, // nguoi update
  created_at: {
    type: Date,
    default: Date.now(), // thoi gian tao
  },
  updated_at: {
    type: Date,
    default: Date.now(), // thoi gian update
  },
  deleted_at: {
    type: Date,
    default: null, // thoi gian xoa, neu chua xoa: null
  },
});

module.exports = mongoose.model("Lesson", Lesson);
