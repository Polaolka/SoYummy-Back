const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.json({
      message: "Email not found",
    });
    throw RequestError(404, "Not Found");
  }
  if (user.verify) {
    res.json({
      message: "Verification has already been passed",
    });
      throw RequestError(400, "Bad Request");
  }
  const verifyEm = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEm);
  res.status(200).json({
    message: "Verification email sent",
  });

};

module.exports = resendVerifyEmail;
