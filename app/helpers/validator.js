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

module.exports = {
  validateSignUp,
  validateSignIn,
};
