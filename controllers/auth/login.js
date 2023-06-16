const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

function congratulateUser(user) {
  if (!user.tenDayFlag) {
    const registrationDate = user.createdAt; // Предполагается, что есть поле createdAt, которое хранит дату регистрации пользователя
    const currentDate = new Date();
    const TEN_DAYS_IN_MS = 10 * 24 * 60 * 60 * 1000; 
    if (currentDate - registrationDate >= TEN_DAYS_IN_MS) {
      console.log('Поздравляем пользователя ' + user.username + ' с 10 днями использования приложения!');
      user.tenDayFlag = true;
      user.save(); 
    }
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "800h" });
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "10m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    accessToken, 
    refreshToken,
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = login;
