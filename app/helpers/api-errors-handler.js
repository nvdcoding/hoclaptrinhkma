const ApiError = require("./error");

function apiErrorHandler(err, req, res, next) {
  console.log(err);
  const response = {
    status: err.code || 500,
    message: err.message || "something went wrong",
  };

  res.status(response.status).send(response);
}

module.exports = apiErrorHandler;
