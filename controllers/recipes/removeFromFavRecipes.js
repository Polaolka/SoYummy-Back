const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");
const mongoose = require("mongoose");

const removeFromFavRecipes = async (req, res) => {
  const { _id: userId } = req.user;
  const { _id: recipeId } = req.body;

  const ObjectId = mongoose.Types.ObjectId;

  const userFavList = await Recipe.find({
    popularity: {
      $elemMatch: {
        id: ObjectId(userId),
      },
    },
  });

  const isInFavList = userFavList.some((item) => item._id.equals(recipeId));

  if (!isInFavList) {
    throw RequestError(404, "not found");
  }

  const result = await Recipe.findByIdAndUpdate(
    recipeId,
    {
      $pull: { popularity: { id: userId } }, 
    },
    { new: true }
  );

  return res.status(200).json(result);
};

module.exports = removeFromFavRecipes;
