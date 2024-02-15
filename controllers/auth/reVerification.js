const { User } = require("../../models");
const { HttpError, nodemailerFn } = require("../../helpers");

const reVerification = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  console.log("user in reVerification:", user);

  if (!user) {
    throw HttpError(401, "User not found");
  }
  if (user.verify) {
    throw HttpError(401, "Email already verify");
  }

  try {
    // user.verify = true;
    // user.verificationToken = "";

    // console.log("user after reVerification:", user);

    // await user.save();

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });

    nodemailerFn(user.verificationToken, email);

    res.status(201).json({
      email,
      [user.verificationToken]: [user.verificationToken],
    });
  } catch (error) {
    if (error.message.includes("E11000") || error.message.code === 11000) {
      // 11000 - помилка mongoDB яка говорить про наявність дублікату даних у БД
      throw HttpError(409, "Email in use");
    }
    throw error;
  }
};

module.exports = reVerification;
