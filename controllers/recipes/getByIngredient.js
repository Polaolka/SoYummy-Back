const { Recipe } = require("../../models/recipe");
const { Ingredient } = require("../../models/ingredients");
const { RequestError } = require("../../helpers");
const mongoose = require("mongoose");

const getByIngredient = async (req, res) => {
  const { ingredient } = req.query;

  if (!ingredient) {
    throw RequestError(400, "Ingredient parameter is required");
  }

  const regex = new RegExp(`.*${ingredient}.*`, "i");

  const ingredientIds = await Ingredient.find({ name: regex }, { _id: 1 });

  if (ingredientIds.length === 0) {
    throw RequestError(400, "Bad request");
  }

  const ingredientObjectIds = ingredientIds.map((id) => mongoose.Types.ObjectId(id));

  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;

  const total = await Recipe.countDocuments({ ingredients: { $elemMatch: { id: { $in: ingredientObjectIds } } } });
  const recipes = await Recipe.find({ ingredients: { $elemMatch: { id: { $in: ingredientObjectIds } } } }).skip(skip).limit(limit);
;

  if (recipes.length === 0) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json({ recipes, total });
};

module.exports = getByIngredient;
