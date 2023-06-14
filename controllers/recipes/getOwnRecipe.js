const { Recipe } = require("../../models/recipe");

const getOwnRecipe = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;
  const count = await Recipe.countDocuments({ owner: _id });
  // const count = await Recipe.estimatedDocumentCount({ owner: _id });
  const result = await Recipe.find({ owner: _id }, "-createdAt -updatedAt")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("owner", "email name");

  res.status(200).json({ ownRecipes: result, total: count });
};

module.exports = getOwnRecipe;
