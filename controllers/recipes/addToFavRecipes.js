const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");
const mongoose = require("mongoose");

const addToFavRecipes = async (req, res) => {
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

  if (isInFavList) {
    throw RequestError(409, "Already in fav recipes");
  }

  const result = await Recipe.findByIdAndUpdate(
    recipeId,
    {
      $push: { popularity: { id: userId } }, //Поле popularity - це масив, до якого додаємо значення
    },
    { new: true }
  );

  return res.status(201).json(result);
};

module.exports = addToFavRecipes;
