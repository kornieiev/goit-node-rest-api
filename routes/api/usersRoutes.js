const express = require("express");

const { authenticate, upload } = require("../../middlewares");

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
  updateAvatar,
  verifyEmail,
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

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

usersRouter.post("/logout", authenticate, logoutUser);

usersRouter.get(
  "/current",
  authenticate,
  validateBody(currentUserSchema),
  currentUser
);

// validateBody(currentUserSchema),
usersRouter.patch(
  "/",
  authenticate,
  validateBody(subscribeUserSchema),
  updateSubscription
);

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = usersRouter;
