const appError = require("../../../helpers/error");
const Report = require("../../../models/Report");
const Post = require("../../../models/Post");
const createReport = async ({ post, content }, reportedBy) => {
  const check = await Post.findOne({ _id: post }).exec();
  if (!check) {
    return {
      status: 400,
      message: "Post not found",
    };
  }
  const report = await Report.create({
    post: check._id,
    author: check.author,
    content: content,
    reported_by: reportedBy,
  });
  return {
    status: 201,
    message: "create report success",
  };
};
// HANDLE REPORT
module.exports = {
  createReport,
};
