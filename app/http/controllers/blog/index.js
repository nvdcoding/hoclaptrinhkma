const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const blogService = require("../../services/blog");
const createBlog = async (req, res, next) => {
  const params = {
    title: req.body.title,
    author: req.jwtDecoded.id,
    img: req.body.img,
    content: req.body.content,
    topic: req.body.topic,
  };
  const check = validator.validateBlog(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await blogService.createBlog(params);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const updateBlog = async (req, res, next) => {
  const params = {
    title: req.body.title,
    img: req.body.img,
    content: req.body.content,
    topic: req.body.topic,
  };
  const blogId = req.params.id;
  if (!blogId) {
    return next(appError.badRequest("No blog provided"));
  }
  const check = validator.validateUpdateBlog(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await blogService.updateBlog(params, blogId);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  if (!blogId) {
    return next(appError.badRequest("No blog provided"));
  }

  const response = await blogService.deleteBlog(blogId);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const changeStatusBlog = async (req, res, next) => {
  const blogId = req.params.id;
  if (!blogId) {
    return next(appError.badRequest("No blog provided"));
  }
  const response = await blogService.changeStatusBlog(blogId);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const getAllBlog = async (req, res, next) => {
  const response = await blogService.getAllBlog();
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
const getOneBlog = async (req, res, next) => {
  const id = req.params.blogId;
  if (!id) {
    return next(appError.badRequest("No id provided"));
  }
  const response = await blogService.getOneBlog(id);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
const getBlogQueue = async (req, res, next) => {
  const response = await blogService.getBlogQueue();
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
const getOneBlogInQueue = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(appError.badRequest("No id provided"));
  }
  const response = await blogService.getOneBlogInQueue(id);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
const getTopic = async (req, res, next) => {
  const topic = req.params.topic;
  if (!topic) {
    return next(appError.badRequest("No topic provided"));
  }
  const response = await blogService.getTopic(topic);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
  getOneBlog,
  getBlogQueue,
  changeStatusBlog,
  getTopic,
  getOneBlogInQueue,
};
