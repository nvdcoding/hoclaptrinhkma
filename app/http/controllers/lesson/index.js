const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const lessonService = require("../../services/lesson");
createLesson = async (req, res, next) => {
  const params = {
    name: req.body.name,
    link: req.body.link,
    course: req.params.id,
  };
  const check = validator.validateLesson(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await lessonService.createLesson(params, req.jwtDecoded.id);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
getOneLesson = async (req, res, next) => {
  if (!req.params.id || !req.params.courseId) {
    return next(appError.badRequest("lesson id or course not provided"));
  }
  const response = await lessonService.getOneLesson(
    req.params.courseId,
    req.params.id
  );
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
getLanguage = async (req, res, next) => {
  if (!req.params.id) {
    return next(appError.badRequest("lesson id"));
  }
  const response = await lessonService.getLanguage(req.params.id);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
getAllLesson = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(appError.badRequest("no id provided"));
  }
  const response = await lessonService.getAllLesson(id);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
deleteLesson = async (req, res, next) => {
  const lessonId = req.params.lessonId;
  const courseId = req.params.id;
  if (!lessonId) {
    return next(appError.badRequest("No lession provided"));
  }
  if (!courseId) {
    return next(appError.badRequest("No course provided"));
  }
  const response = await lessonService.deleteLesson(courseId, lessonId);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
updateLesson = async (req, res, next) => {
  const params = {
    name: req.body.name,
    link: req.body.link,
  };
  const lessonId = req.params.lessonId;
  if (!lessonId) {
    return next(appError.badRequest("No lesson provided"));
  }
  const check = validator.validateUpdateLesson(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await lessonService.updateLesson(
    params,
    req.jwtDecoded.id,
    lessonId
  );
  return res.json({
    status: response.status,
    message: response.message,
  });
};
module.exports = {
  createLesson,
  getOneLesson,
  getAllLesson,
  deleteLesson,
  updateLesson,
  getLanguage,
};
