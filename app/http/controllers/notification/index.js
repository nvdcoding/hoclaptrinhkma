const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const validator = require("../../../helpers/validator");
const notificationService = require("../../services/report");

const createNotification = async (req, res, next) => {
  const params = {
    title: req.body.title,
    content: req.body.content,
    user: req.body.user,
  };
};
