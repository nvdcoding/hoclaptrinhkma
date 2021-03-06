const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const courseService = require("../../services/course");
createCourse = async (req, res, next) => {
  const params = {
    name: req.body.name,
    description: req.body.description,
    path: req.body.path,
    goal: req.body.goal,
    img: req.body.img,
    requirement: req.body.requirement,
    language: req.body.language,
  };
  const check = validator.validateCourse(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await courseService.createCourse(params, req.jwtDecoded.id);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
updateCourse = async (req, res, next) => {
  const params = {
    name: req.body.name,
    description: req.body.description,
    path: req.body.path,
    goal: req.body.goal,
    img: req.body.img,
    requirement: req.body.requirement,
    language: req.body.language,
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
  return res.json({
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
  return res.json({
    status: response.status,
    message: response.message,
  });
};
getAllCourse = async (req, res, next) => {
  const response = await courseService.getAllCourse();
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
getOne = async (req, res, next) => {
  const id = req.params.courseId;
  if (!id) {
    return next(appError.badRequest("No id provided"));
  }
  const response = await courseService.getOne(id);
  return res.json({
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
