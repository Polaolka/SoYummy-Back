const { Recipe } = require("../../models/recipe");
const { User } = require("../../models/user");
const { RequestError, congrTenFavRecipes } = require("../../helpers");
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
      $push: { popularity: { id: userId } },
    },
    { new: true }
  );

  const count = await Recipe.countDocuments({
    "popularity.id": userId,
  });
  const user = await User.findOne({ _id: userId });

  const congrats = congrTenFavRecipes(count, user);
  const message = congrats ? congrats : "";

  return res.status(201).json({ ...result._doc, motivation: message });
};

module.exports = addToFavRecipes;
