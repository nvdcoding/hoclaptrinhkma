const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const commentService = require("../../services/comment");
const createComment = async (req, res, next) => {
  const params = {
    author: req.jwtDecoded.id,
    content: req.body.content,
    post: req.params.post,
  };
  const check = validator.validateComment(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await commentService.createComment(params);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const getPostComment = async (req, res, next) => {
  const post = req.params.post;
  if (!post) {
    return next(appError.badRequest("No post provided"));
  }
  const response = await commentService.getPostComment(post);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
const deleteComment = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await commentService.deleteComment(id);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const updateComment = async (req, res, next) => {
  const params = {
    id: req.params.id,
    content: req.body.content,
  };
  if (!params.id || !params.content) {
    return next(appError.badRequest("invalid Params"));
  }
  const response = await commentService.updateComment(params);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
module.exports = {
  createComment,
  getPostComment,
  deleteComment,
  updateComment,
};
