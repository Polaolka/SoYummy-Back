const getById = require("./getById");
const mainPage = require("./mainPage");
const getByCategory = require("./getByCategory");
const getPopularRecipes = require("./getPopularRecipes");
const getAll = require("./getAll");
const addPopulatityArr = require("./addPopulatityArr");
const addToFavRecipes = require("./addToFavRecipes");
const removeFromFavRecipes = require("./removeFromFavRecipes");

module.exports = {
  getById,
  mainPage,
  getByCategory,
  getPopularRecipes,
  getAll,
  addPopulatityArr,
  addToFavRecipes,
  removeFromFavRecipes,
};
