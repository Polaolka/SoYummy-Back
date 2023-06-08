const { Recipe } = require("../../models/recipe");

const getByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const respons = await Recipe.find({ category }, null, {
    skip,
    limit,
  });

  if (!respons) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(respons);
};

module.exports = getByCategory;
