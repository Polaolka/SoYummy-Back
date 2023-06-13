const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./addToShoppingList");
const updateUser = require("./updateUser");
const verifyEmail = require("./verifyEmail");
const addToShoppingList = require("./addToShoppingList");
const removeShopingItem = require("./removeShopingItem");
const getShoppingList = require("./getShoppingList");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateUser,
  verifyEmail,
  addToShoppingList,
  removeShopingItem,
  getShoppingList
};
