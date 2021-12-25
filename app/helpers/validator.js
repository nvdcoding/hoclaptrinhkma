const Joi = require("joi");
validateSignUp = (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passwordConfirmation: Joi.equal(Joi.ref("password")),
    confirmCode: Joi.string(),
  });
  return schema.validate(params);
};
validateSignIn = (params) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(params);
};
validateCourse = (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    goal: Joi.string().required(),
    img: Joi.string().required(),
    requirement: Joi.string().allow(null, ""),
  });
  return schema.validate(params);
};
module.exports = {
  validateSignUp,
  validateSignIn,
  validateCourse,
};
