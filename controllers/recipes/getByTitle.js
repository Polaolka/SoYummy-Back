const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");

const getByTitle = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    throw RequestError(400, "Title parameter is required");
  }

  const words = title
    .split(" ")
    .map((word) => `(?=.*${word})`)
    .join("");

  const regex = new RegExp(`.*${title}.*`, "i");

  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;
  const count = await Recipe.countDocuments({ title: regex });
  const recipes = await Recipe.find({ title: regex }, "-createdAt -updatedAt")
    .skip(skip)
    .limit(limit)
    .populate("ingredients.id");

  res.status(200).json({ recipes, total: count });

  if (!recipes) {
    throw RequestError(404, "Not found");
  }
};

module.exports = getByTitle;
