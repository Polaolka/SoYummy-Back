const { Recipe } = require("../../models/recipe");

const getOwnRecipe = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Recipe.find({ owner: _id }, "-createdAt -updatedAt", 
  {
    skip,
    limit,
  }).populate(
    "owner",
    "email name subscription"
  );

  res.status(200).json(result);
};

module.exports = getOwnRecipe;
