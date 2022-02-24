const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const excerciseService = require("../../services/excercise");
createExcercise = async (req, res, next) => {
  const params = {
    lesson: req.params.lessonId,
    question: req.body.question,
    description: req.body.description,
    cases: req.body.cases,
  };
  const check = validator.validateExcercise(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await excerciseService.createExcercise(
    params,
    req.jwtDecoded.id
  );
  return res.json({
    status: response.status,
    message: response.message,
  });
};
updateExcercise = async (req, res, next) => {
  const params = {
    question: req.body.question,
    description: req.body.description,
    cases: req.body.cases,
  };

  const excercise = req.params.excerciseId;
  if (!excercise) {
    return next("No excercise provided");
  }
  const check = validator.validateUpdateExcercise(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await excerciseService.updateExcercise(
    params,
    req.jwtDecoded.id,
    excercise
  );
  return res.json({
    status: response.status,
    message: response.message,
  });
};
deleteExcercise = async (req, res, next) => {
  const excerciseId = req.params.id;
  if (!excerciseId) {
    return next(appError.badRequest("No excercise provided"));
  }
  const response = await excerciseService.deleteExcercise(excerciseId);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
getAllExcercise = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(appError.badRequest("no id provided"));
  }
  const response = await excerciseService.getAllExcercise(id);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
getOneExcercise = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(appError.badRequest("No excercise provided"));
  }
  const response = await excerciseService.getOneExcercise(id);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
// getLessonExcercise = async (req, res, next) => {
//   const lessonId = req.params.lessonId;
//   if (!lessonId) {
//     return next(appError.badRequest("No lesson procvided"));
//   }
//   const response = await excerciseService.getLessonExcercise(lessonId);
//   return res.status(response.status).json({
//     data: response.data,
//     status: response.status,
//     message: response.message,
//   });
// };
module.exports = {
  createExcercise,
  updateExcercise,
  deleteExcercise,
  getAllExcercise,
  getOneExcercise,
};
