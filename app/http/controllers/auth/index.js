const appError = require("../../../helpers/error");
const errorHandler = require("../../../helpers/api-errors-handler");
const jwtHelper = require("../../../helpers/jwt");
const auth = require("../../services/auth");
const Token = require("../../../models/Token");
const validator = require("../../../helpers/validator");
const date = require("date-and-time");
const signUp = async (req, res, next) => {
  const params = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
    confirmCode: req.body.confirmCode,
  };
  const check = validator.validateSignUp(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await auth.signUp(params);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const activeAccount = async (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return next(appError.badRequest("No userID provided"));
  }
  const response = await auth.activeAccount(userId);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const signIn = async (req, res, next) => {
  const params = {
    email: req.body.email,
    password: req.body.password,
  };
  const check = validator.validateSignIn(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await auth.signIn(params);
  if (response.status === 400) {
    return res.json({
      status: response.status,
      message: response.message,
    });
  }
  const userData = {
    id: response.user.id,
    name: response.user.name,
    email: response.user.email,
    roles: response.user.roles,
  };
  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "nguyen-duy-kma";
  const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "7d";
  const refreshTokenSecret =
    process.env.REFRESH_TOKEN_SECRET || "r-nguyen-duy-kma";

  const accessToken = await jwtHelper.generate(
    userData,
    accessTokenSecret,
    accessTokenLife
  );
  const refreshToken = await jwtHelper.generate(
    userData,
    refreshTokenSecret,
    refreshTokenLife
  );

  const token = await Token.deleteOne({ user: userData.id });
  const now = new Date();
  const time = parseInt(refreshTokenLife);
  const tokenCreated = await Token.create({
    user: userData.id,
    refreshToken: refreshToken,
    expiredAt: date.addDays(now, time),
  });
  return res.json({
    status: response.status,
    userData,
    courses: response.user.courses,
    accessToken,
    refreshToken,
  });
};
const refreshToken = async (req, res) => {
  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "nguyen-duy-kma";
  const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "7d";
  const refreshTokenSecret =
    process.env.REFRESH_TOKEN_SECRET || "r-nguyen-duy-kma";
  const refreshTokenClient = req.body.refreshToken;
  if (!refreshTokenClient) {
    return next(app.Error.badRequest("No refresh token provided"));
  }
  const refreshToken = await Token.findOne({
    refreshToken: refreshTokenClient,
  });
  if (!refreshToken) {
    return next(appError.badRequest("No refresh token found"));
  }
  try {
    const decoded = await jwtHelper.verify(
      refreshTokenClient,
      refreshTokenSecret
    );
    const userData = decoded.data;
    const accessToken = await jwtHelper.generate(
      userData,
      accessTokenSecret,
      accessTokenLife
    );
    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    return next(appError.badRequest("Invalid Token"));
  }
};
const logout = async (req, res, next) => {
  const params = {
    userId: req.body.userId,
  };
  const token = await Token.deleteOne({ user: params.userId });
  if (token.deletedCount < 1) {
    return next(appError.badRequest("No token found"));
  }
  res.status(200).json({
    status: 200,
    message: "Logout success",
  });
};
const forgetPassword = async (req, res, next) => {
  const email = req.body.email;
  const check = validator.validateReset({ email });
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await auth.forgetPassword(email);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
const resetPassword = async (req, res, next) => {
  const params = {
    token: req.params.token,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  };
  const check = validator.validateResetPass(params);
  if (check.error) {
    return next(appError.badRequest(check.error.details[0].message));
  }
  const response = await auth.resetPassword(params);
  return res.json({
    status: response.status,
    message: response.message,
  });
};
module.exports = {
  signUp,
  signIn,
  logout,
  activeAccount,
  refreshToken,
  forgetPassword,
  resetPassword,
};
