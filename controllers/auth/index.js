const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./addToShoppingList");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const addToShoppingList = require("./addToShoppingList");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  addToShoppingList,
};
