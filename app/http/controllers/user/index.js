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
    social: req.body.social,
  };
  const check = validator.validateUpdateUser(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await userService.updateUser(params, req.jwtDecoded.id);
  return res.json({
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
  return res.json({
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
  return res.json({
    data: response.data,
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
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const getStore = async (req, res, next) => {
  const userId = req.jwtDecoded.id;
  const response = await userService.getStore(userId);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
const removeStore = async (req, res, next) => {
  const params = {
    userId: req.jwtDecoded.id,
    postId: req.body.postId,
  };
  if (!params.userId || !params.postId) {
    return next(appError.badRequest("Invalid param"));
  }
  const response = await userService.removeStore(params);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const getProfile = async (req, res, next) => {
  const id = req.jwtDecoded.id;
  if (!id) {
    return res.json({
      status: 400,
      message: "no user id provided",
    });
  }
  const response = await userService.getProfile(id);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
const getProcess = async (req, res, next) => {
  const params = {
    userId: req.jwtDecoded.id,
    courseId: req.params.courseId,
  };
  if (!params.userId || !params.courseId) {
    return res.json({
      status: 400,
      message: "Invalid params",
    });
  }
  const response = await userService.getProcess(params);
  return res.json({
    complete: response.complete,
    data: response.data,
    count: response.count,
    status: response.status,
    message: response.message,
  });
};
/* By ADMIN */
const setUser = async (req, res, next) => {
  const params = {
    userId: req.params.id,
    status: req.body.status,
    role: req.body.role,
  };
  if (
    !params.status ||
    !params.userId ||
    !["active", "disabled"].includes(params.status) ||
    !params.role ||
    !["USER", "MOD"].includes(params.role)
  ) {
    return next(appError.badRequest("Invalid params"));
  }
  const response = await userService.setUser(params);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
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
  return res.json({
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
  return res.json({
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
  return res.json({
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

  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
const getOneUser = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.json({
      status: 400,
      message: "no user id provided",
    });
  }
  const response = await userService.getOneUser(id);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
const getAllUser = async (req, res, next) => {
  const response = await userService.getAllUser();
  return res.json({
    data: response.data,
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
  getProfile,
  getOneUser,
  getAllUser,
  getStore,
  removeStore,
  setUser,
  getProcess,
};
