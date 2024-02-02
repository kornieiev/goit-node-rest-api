const express = require("express");

const { isValidToken } = require("../../middlewares");

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../../controllers/auth");

const {
  registerUserSchema,
  loginUserSchema,
  logoutUserSchema,
  currentUserSchema,
} = require("../../schemas/usersSchemas");

const { validateBody } = require("../../helpers");

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerUserSchema), registerUser);
usersRouter.post("/login", validateBody(loginUserSchema), loginUser);
usersRouter.post(
  "/logout",
  isValidToken,
  // validateBody(logoutUserSchema),
  logoutUser
);
usersRouter.get(
  "/current",
  isValidToken,
  validateBody(currentUserSchema),
  currentUser
);

module.exports = usersRouter;
