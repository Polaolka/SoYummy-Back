const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");

const addToFavRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const { _id } = req.body;

  const recipeObject = await Recipe.findById(_id);
  if (!recipeObject) {
    throw new RequestError(404, "Not found");
  }
  if (!recipeObject.popularity) {
    recipeObject.popularity = [];
  }
  recipeObject.popularity.push({ id: userId });
  await recipeObject.save();
  console.log(recipeObject);
  
  // const newPopularity = recipeObject.popularity

  // const newRecipe = {
  //   ...recipeObject,
  //   popularity: newPopularity,
  // };

  const result = await Recipe.findByIdAndUpdate(_id, { $set: recipeObject }, { new: true });

  return res.status(200).json(result);
};

module.exports = addToFavRecipes;
