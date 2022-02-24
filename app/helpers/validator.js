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
    path: Joi.string().required(),
    goal: Joi.string().required(),
    img: Joi.string().required(),
    requirement: Joi.string().allow(null, ""),
    language: Joi.string().required(),
  });
  return schema.validate(params);
};
const validateReset = (params) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(params);
};
const validateResetPass = (params) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    passwordConfirmation: Joi.equal(Joi.ref("password")),
    token: Joi.string().required(),
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
const validateLesson = (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    link: Joi.string().required(),
    course: Joi.string().required(),
  });
  return schema.validate(params);
};
const validateUpdateLesson = (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    link: Joi.string().required(),
  });
  return schema.validate(params);
};
const validateExcercise = (params) => {
  const schema = Joi.object({
    lesson: Joi.string().required(),
    question: Joi.string().required(),
    description: Joi.string(),
    cases: Joi.array()
      .items(
        Joi.object({
          input: Joi.string(),
          output: Joi.string(),
        })
      )
      .required(),
  });
  return schema.validate(params);
};
const validateUpdateExcercise = (params) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    description: Joi.string(),
    cases: Joi.array()
      .items(
        Joi.object({
          input: Joi.string().required(),
          output: Joi.string().required(),
        })
      )
      .required(),
  });
  return schema.validate(params);
};
const validateBlog = (params) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    img: Joi.string().allow(null),
    content: Joi.string().required(),
    topic: Joi.string().allow(null),
  });
  return schema.validate(params);
};
const validateUpdateBlog = (params) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    img: Joi.string().allow(null),
    topic: Joi.string().allow(null),
  });
  return schema.validate(params);
};
const validateComment = (params) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    content: Joi.string().required(),
    post: Joi.string().required(),
  });
  return schema.validate(params);
};
const validateUpdateComment = (params) => {
  const schema = Joi.object({
    content: Joi.string().required(),
    post: Joi.string().required(),
  });
  return schema.validate(params);
};
module.exports = {
  validateSignUp,
  validateSignIn,
  validateCourse,
  validateReset,
  validateUpdateUser,
  validateChangePassword,
  validateReport,
  validateModCourse,
  validateLesson,
  validateUpdateLesson,
  validateExcercise,
  validateUpdateExcercise,
  validateBlog,
  validateUpdateBlog,
  validateComment,
  validateUpdateComment,
  validateResetPass,
};
