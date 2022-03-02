const appError = require("../../../helpers/error");
const Blog = require("../../../models/Blog");
const createBlog = async ({ title, author, img, content, topic }) => {
  const check = await Blog.findOne({
    title: title,
    deteled_at: { $ne: null },
  }).exec();
  if (check) {
    return {
      status: 400,
      message: "Blog already exists",
    };
  }
  const blog = await Blog.create({
    title,
    author,
    img,
    content,
    topic,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
  return {
    status: 201,
    message: "create blog success",
  };
};
const updateBlog = async ({ title, img, content, topic }, blogId) => {
  const check = await Blog.findById(blogId).exec();
  if (!check) {
    return {
      status: 400,
      message: "Blog not found",
    };
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: blogId },
    {
      title,
      img,
      content,
      topic,
      updated_at: Date.now(),
    }
  );
  return {
    status: 200,
    message: "update blog success",
  };
};
const getAllBlog = async (pages) => {
  const perPage = 2;
  const limit = pages * perPage;
  const data = await Blog.find({ status: "enable" })
    .sort({ created_at: -1 })
    .limit(limit)
    .populate("author", "name avatar ")
    .exec();
  return {
    data,
    status: 200,
    message: "Get all success",
  };
};
const getOneBlog = async (id) => {
  const check = await Blog.findOne({ _id: id, status: "enable" }).populate(
    "author",
    "name avatar"
  );
  // const author =
  if (!check) {
    return {
      status: 400,
      message: "Blog not found",
    };
  }
  return {
    data: check,
    status: 200,
    message: "find one success",
  };
};
const getBlogQueue = async () => {
  const data = await Blog.find({ status: "disable" })
    .populate("author", "avatar name")
    .exec();
  return {
    data,
    status: 200,
    message: "Get queue success",
  };
};
const changeStatusBlog = async (id) => {
  const check = await Blog.findOne({ _id: id }).exec();
  if (!check) {
    return {
      status: 400,
      message: "Blog not found",
    };
  }
  let status = "disable";
  if (check.status === "disable") {
    status = "enable";
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    {
      status,
    }
  );
  return {
    status: 200,
    message: "change status success",
  };
};
const deleteBlog = async (id) => {
  const check = await Blog.findOne({ _id: id });
  if (!check) {
    return {
      status: 400,
      message: "blog not found",
    };
  }
  const blog = await Blog.findOneAndDelete({ _id: id });
  const report = await Report.deleteMany({ post: id });
  return {
    status: 200,
    message: "Delete Blog success",
  };
};
const getTopic = async (topic) => {
  const data = await Blog.find({
    topic: { $regex: topic },
    status: "enable",
  })
    .sort({ created_at: -1 })
    .populate("author", "name avatar")
    .exec();
  return {
    data,
    status: 200,
    message: "Get topic success",
  };
};
const getOneBlogInQueue = async (id) => {
  const check = await Blog.findOne({ _id: id, status: "disable" }).populate(
    "author",
    "name avatar"
  );
  // const author =
  if (!check) {
    return {
      status: 400,
      message: "Blog not found",
    };
  }
  return {
    data: check,
    status: 200,
    message: "find one success",
  };
};
module.exports = {
  createBlog,
  updateBlog,
  getAllBlog,
  getOneBlog,
  getBlogQueue,
  changeStatusBlog,
  getTopic,
  deleteBlog,
  getOneBlogInQueue,
};
