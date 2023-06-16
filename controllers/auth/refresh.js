const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;

  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      throw RequestError(403, "Token invalid");
    }

    const payload = { id };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "10m", });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d", });

    res.json({accessToken, refreshToken})

  } catch (error) {
    throw RequestError(403, error.message);
  }
};

module.exports = refresh;
