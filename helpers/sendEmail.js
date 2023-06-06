require("dotenv").config();
const nodemailer = require("nodemailer");

const { UKR_NET_PASSWORD, UKR_NET_USER } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_USER,
    pass: UKR_NET_PASSWORD,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "polaolka@meta.ua",
//   from: "olgapolichuk@ukr.net",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// };
// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));


// const data = {
//     to: "",
//     subject: "",
//     html: ""
// }

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_USER };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
