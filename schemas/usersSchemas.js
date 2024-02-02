const Joi = require("joi");

const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  // subscription: Joi.string().required(),
});

const logoutUserSchema = Joi.object({
  // email: Joi.string().email().required(),
  // password: Joi.string().required(),
  // token: Joi.string().required(),
});

const currentUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  // token: Joi.string().required(),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  logoutUserSchema,
  currentUserSchema,
};
