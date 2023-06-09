const { Recipe } = require("../../models/recipe");

const getOwnRecipe = async (req, res) => {
  const { _id } = req.user;

  const result = await Recipe.find({ owner: _id }).populate(
    "owner",
    "email name subscription"
  );

  res.status(200).json(result);
};

module.exports = getOwnRecipe;
