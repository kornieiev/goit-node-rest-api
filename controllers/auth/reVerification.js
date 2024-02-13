const { User } = require("../../models");
const { HttpError, nodemailerFn } = require("../../helpers");

const reVerification = (req, res, next) => {
  const { email } = req.body;
  console.log("email", email);
  const user = User.findOne({ email });

  if (!user) {
    throw HttpError(401, "User not found");
  }
  if (user.verify) {
    throw HttpError(401, "Email already verify");
  }

  nodemailerFn(user.verificationToken, email);

  res.status(201).json({
    email,
    [user.verificationToken]: [user.verificationToken],
  });
};

module.exports = reVerification;
