const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);

  try {
    const result = await User.create({
      email,
      password: hashedPassword,
      subscription: "starter",
      avatarURL,
    });
    res.status(201).json({
      id: result._id,
      email,
      subscription: "starter",
      avatarURL,
    });
  } catch (error) {
    if (error.message.includes("E11000") || error.message.code === 11000) {
      // 11000 - помилка mongoDB яка говорить про наявність дублікату даних у БД
      throw HttpError(409, "Email in use");
    }
    throw error;
  }
};
module.exports = registerUser;
