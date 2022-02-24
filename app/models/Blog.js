const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema({
  title: { type: String, require: true }, // tieu de bai viet
  author: { type: String, require: true, ref: "User" }, // id tac gia
  img: { type: String }, // anh bai viet
  content: { type: String, require: true }, // noi dung bai viet
  topic: { type: String, default: "others" }, // chu de bai viet
  status: { type: String, enum: ["disable", "enable"], default: "disable" }, // trang thai bai viet
  created_at: {
    type: Date,
    default: Date.now(), // ngay dang
  },
  updated_at: {
    type: Date,
    default: Date.now(), // ngay chinh sua
  },
});

module.exports = mongoose.model("Blog", Blog);
