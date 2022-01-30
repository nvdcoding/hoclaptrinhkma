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
  const reportedBy = params.body.reportedBy || "Unknown";
  const check = validator.validateReport(params, reportedBy);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await reportService.createReport(params, reportedBy);
  return res.status(response.status).json({
    status: response.status,
    message: response.message,
  });
};
module.exports = {
  createReport,
};
