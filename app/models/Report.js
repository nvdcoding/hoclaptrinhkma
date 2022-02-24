const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Report = new Schema({
  post: { type: String, require: true, ref: "Blog" }, // id cua blog muon bao cao
  author: { type: String, require: true, ref: "User" }, // id tac gia blog
  content: { type: String, require: true }, // noi dung bao cao
  reported_by: { type: String, ref: "User" }, // nguoi bao cao
  reported_at: {
    type: Date, // thoi gian bao cao
  },
  updated_at: {
    type: Date, // thoi gian update
  },
});

module.exports = mongoose.model("Report", Report);
