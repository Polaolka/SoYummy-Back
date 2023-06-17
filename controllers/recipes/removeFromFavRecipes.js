const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");

const removeFromFavRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const { _id } = req.body;





  

  const recipeObject = await Recipe.findById(_id);
  if (!recipeObject) {
    throw new RequestError(404, "Not found");
  }
  if (!recipeObject.popularity) {
    recipeObject.popularity = [];
  }
  const index = recipeObject.popularity.findIndex((item) =>
    item.id.equals(userId)
  );
  if (index === -1) {
    throw new RequestError(404, "Not found");
  }
  if (index !== -1) {
    recipeObject.popularity.splice(index, 1);
  }

  await recipeObject.save();

  const result = await Recipe.findByIdAndUpdate(
    _id,
    { $set: recipeObject },
    { new: true }
  );

  return res.status(200).json(result);
};

module.exports = removeFromFavRecipes;
