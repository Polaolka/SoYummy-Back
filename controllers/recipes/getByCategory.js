const { Recipe } = require("../../models/recipe");

const getByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const categoryRegex = new RegExp(category, "i");

  const count = await Recipe.countDocuments({ category: categoryRegex });
  const respons = await Recipe.find({ category: categoryRegex }, null, {
    skip,
    limit,
  }).populate("ingredients.id");

  if (!respons) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({respons, total: count });
};

module.exports = getByCategory;
