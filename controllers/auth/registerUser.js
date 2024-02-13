const { User } = require("../../models");
const { HttpError, emailContentMaker } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { nanoid } = require("nanoid");

const { MAIL_PASSWORD } = process.env;

// const emailContentMaker = (verificationCode) => {
//   return `<a href="${BASE_URL}/auth/verify/${verificationCode}" target="_blank" rel="noopener nofollow noreferrer"> Click here to verify your email </a>`;
// };

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "mail.kornieiev@meta.ua",
      pass: MAIL_PASSWORD,
    },
  };

  const verificationCode = nanoid();

  const transporter = nodemailer.createTransport(config);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);

  const emailOptions = {
    from: "mail.kornieiev@meta.ua",
    to: email,
    subject: "Nodemailer test",
    html: emailContentMaker(verificationCode),
  };

  try {
    const result = await User.create({
      // ...req.body,
      email,
      password: hashedPassword,
      subscription: "starter",
      avatarURL,
      verificationToken: verificationCode,
    });
    transporter
      .sendMail(emailOptions)
      .then((info) => console.log(info))
      .catch((err) => console.log(err));
    res.status(201).json({
      id: result._id,
      email,
      subscription: "starter",
      avatarURL,
      verificationToken: verificationCode,
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
