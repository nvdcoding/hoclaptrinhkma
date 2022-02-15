const appError = require("../../../helpers/error");
const Report = require("../../../models/Report");
const Blog = require("../../../models/Blog");
const blogService = require("../../../http/services/blog");

const createReport = async ({ post, content }, reportedBy) => {
  const check = await Blog.findOne({ _id: post }).exec();
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
    reported_at: Date.now(),
    updated_at: Date.now(),
  });
  return {
    status: 201,
    message: "create report success",
  };
};
// HANDLE REPORT
const handleReport = async ({ reportId, postId, command }) => {
  if (command === "DELETE") {
    const result = await blogService.deleteBlog(postId);
    const del = await Report.deleteMany({ post: postId });
    const reports = await Report.find({})
      .populate("post", "_id title")
      .populate("reported_by", "_id email name")
      .populate("author", "name email _id")
      .exec();
    return {
      data: reports,
      status: 200,
      message: "Delete Blog success",
    };
  } else {
    const result = await blogService.changeStatusBlog(postId);
    const del = await Report.deleteMany({ post: postId });
    const reports = await Report.find({})
      .populate("post", "_id title")
      .populate("reported_by", "_id email name")
      .populate("author", "name email _id")
      .exec();
    return {
      data: reports,
      status: 200,
      message: "change status Blog success",
    };
  }
};
const getAllReport = async () => {
  const reports = await Report.find({})
    .populate("post", "_id title")
    .populate("reported_by", "_id email name")
    .populate("author", "name email _id")
    .exec();
  return {
    data: reports,
    status: 200,
    message: "Get All success",
  };
};
module.exports = {
  createReport,
  handleReport,
  getAllReport,
};
