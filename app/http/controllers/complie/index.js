const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const complieService = require("../../services/complie");
const resolveExc = async (req, res, next) => {
  const params = {
    idExc: req.params.id,
    answer: req.body.answer,
    language: req.params.language,
  };
  if (!params.idExc || !params.answer || !params.language) {
    return next(appError.badRequest("invalid params"));
  }
  const response = await complieService.resolveExc(params, req.jwtDecoded.id);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};

module.exports = {
  resolveExc,
};
