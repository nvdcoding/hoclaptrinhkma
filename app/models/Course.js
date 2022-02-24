const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = new Schema({
  name: { type: String, require: true }, // ten khoa hoc
  description: { type: String, require: true }, // mo ta khoa hoc
  goal: { type: String, require: true }, // muc tieu khoa hoc
  img: { type: String, require: true }, // anh mo ta khoa hoc
  path: { type: String, require: true, default: "Other" }, // lo trinh khoa hoc
  requirement: { type: String }, // yeu cau khoa hoc
  lesson: [], // danh sach bai hoc
  language: { type: String, require: true },
  created_by: { type: String }, // id nguoi tao
  updated_by: { type: String }, // id nguoi update
  created_at: {
    type: Date,
    default: Date.now(), // thoi gian tao
  },
  updated_at: {
    type: Date,
    default: Date.now(), // thoi gian update
  },
  deleted_at: { type: Date, default: null }, // thoi gian xoa, neu chua xoa thi null
});

module.exports = mongoose.model("Course", Course);
