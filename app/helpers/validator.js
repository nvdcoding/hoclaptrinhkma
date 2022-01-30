const Joi = require("joi");
const validateSignUp = (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passwordConfirmation: Joi.equal(Joi.ref("password")),
    confirmCode: Joi.string(),
  });
  return schema.validate(params);
};
const validateSignIn = (params) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(params);
};
const validateCourse = (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    goal: Joi.string().required(),
    img: Joi.string().required(),
    requirement: Joi.string().allow(null, ""),
  });
  return schema.validate(params);
};
const validateUpdateUser = (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    bio: Joi.string().allow(null, ""),
    avatar: Joi.string().allow(null, ""),
    social: Joi.object().allow(null, {}),
  });
  return schema.validate(params);
};
const validateChangePassword = (params) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    passwordConfirmation: Joi.equal(Joi.ref("password")),
  });
  return schema.validate(params);
};
const validateReport = (params) => {
  const schema = Joi.object({
    post: Joi.string().required(),
    content: Joi.string().required(),
  });
  return schema.validate(params);
};
const validateModCourse = (params) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    course: Joi.string().required(),
  });
  return schema.validate(params);
};
module.exports = {
  validateSignUp,
  validateSignIn,
  validateCourse,
  validateUpdateUser,
  validateChangePassword,
  validateReport,
  validateModCourse,
};
