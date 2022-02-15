const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, min: 6, require: true },
  bio: { type: String },
  avatar: { type: String },
  roles: { type: String },
  social: {},
  courses: { type: [], ref: "Course" },
  storage: { type: [], ref: "Blog" },
  status: {
    type: String,
    enum: ["active", "disabled"],
    default: "disabled",
  },
  resetPasswordToken: { type: String },
});

module.exports = mongoose.model("User", User);
