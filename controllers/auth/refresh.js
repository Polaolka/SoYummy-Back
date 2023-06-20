const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);

    const user = await User.findOne({ refreshToken: token });
  
    if (!user) {

      throw RequestError(403, "Token invalid");
    }

    const payload = { id };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {expiresIn: "2m"});
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "7d" });
    user.accessToken = accessToken; 
    user.refreshToken = refreshToken; 
    await User.findByIdAndUpdate(user._id, {accessToken, refreshToken} );

    res.json({ accessToken,  refreshToken});
  }
  catch(error) {
      throw RequestError(403, error.message);
  }


};

module.exports = refresh;
