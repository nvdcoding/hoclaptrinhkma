const nodeMailer = require("nodemailer");

const account = {
  user: process.env.GMAIL_ACCOUNT,
  pass: process.env.GMAIL_PASS,
};
const mailHost = "smtp.gmail.com";
const mailPort = 587;
const sendMail = (to, subject, content) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: account,
  });
  const options = {
    from: account.user,
    to,
    subject,
    html: content,
  };
  return transporter.sendMail(options);
};
module.exports = { sendMail };
