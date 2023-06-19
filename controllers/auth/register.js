const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "800h" });
  // const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "10m" });
  // const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });

  await User.findByIdAndUpdate(newUser._id, { token, accessToken, refreshToken });

  res.status(201).json({
    message: "register  successful",
    token,
    // accessToken, 
    // refreshToken,
    user: {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = register;


// const bcrypt = require("bcrypt");
// const gravatar = require("gravatar");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } =
//   process.env;

// const { User } = require("../../models/user");

// const { RequestError, congFirstDayUser } = require("../../helpers");

// const register = async (req, res) => {
//   const { name, email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user) {
//     throw RequestError(409, "Email already in use");
//   }

//   const hashPassword = await bcrypt.hash(password, 10);
//   const avatarURL = gravatar.url(email);

//   const newUser = await User.create({
//     ...req.body,
//     password: hashPassword,
//     avatarURL,
//   });

//   const payload = {
//     id: newUser._id,
//   };

//   const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "1m" });
//   const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
//     expiresIn: "7d",
//   });

//   let motivation = "";
//   await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });
//   if (newUser) {
//     const congratsMessage = congFirstDayUser(newUser);
//     motivation = congratsMessage ? congratsMessage : "";
//   }

//   res.status(201).json({
//     message: "register  successful",
//     accessToken,
//     refreshToken,
//     user: {
//       _id: newUser._id,
//       email: newUser.email,
//       name: newUser.name,
//       email: newUser.email,
//       avatarURL: newUser.avatarURL,
//     },
//     motivation,
//   });
// };

// module.exports = register;
