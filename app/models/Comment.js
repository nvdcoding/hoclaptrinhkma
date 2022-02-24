const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" }, // id nguoi comment
  content: { type: String, require: true }, // noi dung comment
  post: { type: String, require: true }, // id bai viet
  created_at: {
    type: Date,
    default: Date.now(), // thoi gian comment
  },
  updated_at: {
    type: Date,
    default: Date.now(), // thoi gian chinh sua comment
  },
  deleted_at: {
    type: Date,
    default: null, // thoi gian xoa comment, neu khong xoa thi null
  },
});

module.exports = mongoose.model("Comment", Comment);
