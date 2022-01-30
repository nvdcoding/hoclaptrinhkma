const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const courseService = require("../../services/course");
createCourse = async (req, res, next) => {
  const params = {
    name: req.body.name,
    description: req.body.description,
    goal: req.body.goal,
    img: req.body.img,
    requirement: req.body.requirement,
  };
  const check = validator.validateCourse(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await courseService.createCourse(params, req.jwtDecoded.id);
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
updateCourse = async (req, res, next) => {
  const params = {
    name: req.body.name,
    description: req.body.description,
    goal: req.body.goal,
    img: req.body.img,
    requirement: req.body.requirement,
  };
  const courseId = req.params.id;
  if (!courseId) {
    return next(appError.badRequest("No course provided"));
  }
  const check = validator.validateCourse(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await courseService.updateCourse(
    params,
    req.jwtDecoded.id,
    courseId
  );
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
deleteCourse = async (req, res, next) => {
  const courseId = req.params.id;
  if (!courseId) {
    return next(appError.badRequest("No course provided"));
  }
  const response = await courseService.deleteCourse(courseId);
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
getAllCourse = async (req, res, next) => {
  const response = await courseService.getAllCourse();
  return res.status(response.status).json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
getOne = async (req, res, next) => {
  const slug = req.params.slug;
  if (!slug) {
    return next(appError.badRequest("No slug provided"));
  }
  const response = await courseService.getOne(slug);
  return res.status(response.status).json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourse,
  getOne,
};
