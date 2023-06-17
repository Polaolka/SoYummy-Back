const getById = require("./getById");
const mainPage = require("./mainPage");
const getByCategory = require("./getByCategory");
const getPopularRecipes = require("./getPopularRecipes");
const getAll = require("./getAll");
const addToFavRecipes = require("./addToFavRecipes");
const removeFromFavRecipes = require("./removeFromFavRecipes");
const addRecipe = require("./addRecipe");
const getOwnRecipe = require("./getOwnRecipe");
const deleteOne = require("./deleteOne");
const getFavoruteRecipes = require("./getFavoruteRecipes");
const getByTitle = require("./getByTitle");
const getByIngredient = require("./getByIngredient");

module.exports = {
  getById,
  mainPage,
  getByCategory,
  getPopularRecipes,
  getAll,
  addToFavRecipes,
  removeFromFavRecipes,
  addRecipe,
  getOwnRecipe,
  deleteOne,
  getFavoruteRecipes,
  getByTitle,
  getByIngredient
};
