const { Recipe } = require("../../models/recipe");

const getFavoruteRecipes = async (req, res) => {
  const { _id } = req.user; 

  const allRecipes = await Recipe.find({});
  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;

  const count = await Recipe.countDocuments({
    "popularity.id": _id,
  });

  const favoriteRecipes = await Recipe.find({
    "popularity.id": _id,
  })
    .skip(skip)
    .limit(limit);

  res.json({favoriteRecipes, total: count});
};

module.exports = getFavoruteRecipes;
