const express = require("express");

const { tokenValidator } = require("../../middlewares");

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
} = require("../../controllers/auth");

const {
  registerUserSchema,
  loginUserSchema,
  logoutUserSchema,
  currentUserSchema,
  subscribeUserSchema,
} = require("../../schemas/usersSchemas");

const { validateBody } = require("../../helpers");

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerUserSchema), registerUser);
usersRouter.post("/login", validateBody(loginUserSchema), loginUser);
usersRouter.post(
  "/logout",
  tokenValidator,
  // validateBody(logoutUserSchema),
  logoutUser
);

usersRouter.get(
  "/current",
  tokenValidator,
  validateBody(currentUserSchema),
  currentUser
);

validateBody(currentUserSchema),
  usersRouter.patch(
    "/",
    tokenValidator,
    validateBody(subscribeUserSchema),
    updateSubscription
  );

module.exports = usersRouter;
