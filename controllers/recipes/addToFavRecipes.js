const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");

const addToFavRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const { _id } = req.body;
  
  const allRecipes = await Recipe.find({});
  const favoriteRecipes = allRecipes.filter(recipe => {
    const hasPopularity = recipe.popularity.some(item => userId.equals(item.id));
    return hasPopularity;
  });
  
  const isInFavList = favoriteRecipes.some(item => item._id.equals(_id));

  if (isInFavList) {
    throw RequestError(409, "Already in fav recipes");
  }

  const recipeObject = await Recipe.findById(_id);

  if (!recipeObject) {
    throw RequestError(404, "Not found");
  }

  if (!recipeObject.popularity) {
    recipeObject.popularity = [];
  }

  recipeObject.popularity.push({ id: userId });
  await recipeObject.save();
  console.log(recipeObject);
  

  const result = await Recipe.findByIdAndUpdate(_id, { $set: recipeObject }, { new: true });

  return res.status(200).json(result);
};

module.exports = addToFavRecipes;
