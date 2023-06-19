const jwt = require("jsonwebtoken");

const { SECRET_KEY, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const { RequestError } = require("../helpers");

const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(RequestError(401));
  }
  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.accessToken || user.accessToken !== token) {
      // if (!user || !user.accessToken ) {

      next(RequestError(401));
    }

    req.user = user;
    next();
  } catch {
    next(RequestError(401));
  }
};

module.exports = authenticate;
