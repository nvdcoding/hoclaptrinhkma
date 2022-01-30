const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const userService = require("../../services/user");
/* By USER */
const updateUser = async (req, res, next) => {
  const params = {
    name: req.body.name,
    bio: req.body.bio,
    avatar: req.body.avatar,
    social: JSON.parse(req.body.social),
  };
  const check = validator.validateUpdateUser(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await userService.updateUser(params, req.jwtDecoded.id);
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
const changePassword = async (req, res, next) => {
  const params = {
    oldPassword: req.body.oldPassword,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  };
  const check = validator.validateChangePassword(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await userService.changePassword(params, req.jwtDecoded.id);
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
const addCourse = async (req, res, next) => {
  const courseId = req.body.courseId;
  if (!courseId) {
    return next(appError.badRequest("Invalid course"));
  }
  const response = await userService.addCourse(courseId, req.jwtDecoded.id);
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
const storePost = async (req, res, next) => {
  const postId = req.body.postId;
  if (!postId) {
    return next(appError.badRequest("Invalid postId"));
  }
  const response = await userService.storePost(postId, req.jwtDecoded.id);
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
/* By ADMIN */
const setUserStatus = async (req, res, next) => {
  const params = {
    status: req.body.status.toLowerCase(),
    userId: req.params.id,
  };
  if (
    !params.status ||
    !params.userId ||
    !["active", "disabled"].includes(params.status)
  ) {
    return next(appError.badRequest("Invalid params (status or userId)"));
  }
  const response = await userService.setUserStatus(params);
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
const setUserRole = async (req, res, next) => {
  const params = {
    role: req.body.role.toUpperCase(),
    userId: req.params.id,
  };
  if (
    !params.role ||
    !params.userId ||
    !["USER", "MOD"].includes(params.role)
  ) {
    return next(appError.badRequest("Invalid params (role or userId)"));
  }
  const response = await userService.setUserRole(params);
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
const setModCourse = async (req, res, next) => {
  const params = {
    userId: req.params.id,
    course: req.body.course,
  };
  const check = validator.validateModCourse(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await userService.setModCourse(params);
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return next(appError.badRequest("Invalid params id"));
  }
  const response = await userService.deleteUser(userId);

  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};

module.exports = {
  updateUser,
  changePassword,
  addCourse,
  storePost,
  setUserStatus,
  setUserRole,
  setModCourse,
  deleteUser,
};
