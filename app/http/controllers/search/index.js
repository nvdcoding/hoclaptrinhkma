const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const searchService = require("../../services/search");

const search = async (req, res, next) => {
  const key = req.query.key;
  if (!key) {
    return next(appError.badRequest("Invalid Params: key not found"));
  }
  const response = await searchService.search(key);
  return res.json({
    data: response.data,
    status: response.status,
    message: response.message,
  });
};
module.exports = {
  search,
};
