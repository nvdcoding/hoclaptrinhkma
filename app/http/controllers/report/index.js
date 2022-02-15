const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const reportService = require("../../services/report");
/* By USER */
const createReport = async (req, res, next) => {
  const params = {
    post: req.body.post,
    content: req.body.content,
  };
  const reportedBy = req.body.reportedBy;
  const check = validator.validateReport(params, reportedBy);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await reportService.createReport(params, reportedBy);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
/* By ADMIN*/
const handleReport = async (req, res, next) => {
  const params = {
    reportId: req.body.reportId,
    postId: req.body.postId,
    command: req.body.command,
  };
  if (!params.reportId || !params.postId || !params.command) {
    return next(appError.badRequest("Params invalid"));
  }
  if (!["DELETE", "BLOCK"].includes(params.command)) {
    return next(appError.badRequest("invalid command"));
  }
  const response = await reportService.handleReport(params);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
const getAllReport = async (req, res, next) => {
  const response = await reportService.getAllReport();
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
module.exports = {
  createReport,
  handleReport,
  getAllReport,
};
