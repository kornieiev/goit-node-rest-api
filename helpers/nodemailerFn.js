const nodemailer = require("nodemailer");
const emailContentMaker = require("./emailContentMaker");
// require("dotenv").config();

const { EMAIL_SENDER_2, MAIL_PASSWORD_2 } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_SENDER_2,
    pass: MAIL_PASSWORD_2,
  },
};

const nodemailerFn = (verificationCode, email) => {
  const transporter = nodemailer.createTransport(config);

  const emailOptions = {
    from: EMAIL_SENDER_2,
    to: email,
    subject: "Nodemailer test",
    html: emailContentMaker(verificationCode),
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = nodemailerFn;
