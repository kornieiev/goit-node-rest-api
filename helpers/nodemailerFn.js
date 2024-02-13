const nodemailer = require("nodemailer");
const emailContentMaker = require("./emailContentMaker");
require("dotenv").config();

const { MAIL_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "mail.kornieiev@meta.ua",
    pass: MAIL_PASSWORD,
  },
};

const nodemailerFn = (verificationCode, email) => {
  const transporter = nodemailer.createTransport(config);

  const emailOptions = {
    from: "mail.kornieiev@meta.ua",
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
