const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, min: 6, require: true },
  bio: { type: String },
  avatar: { type: String },
  roles: { type: String },
  social: {}, // thông tin về mạng xã hội: type: object
  courses: { type: [], ref: "Course" }, // Khóa học user đang theo học
  manage: { type: [], ref: "Course" }, // Khóa học mod đang quản lý
  storage: { type: [], ref: "Blog" }, // danh sách bài viết đang lưu trữ
  status: {
    type: String,
    enum: ["active", "disabled"],
    default: "disabled",
  },
  resetPasswordToken: { type: String },
});

module.exports = mongoose.model("User", User);
