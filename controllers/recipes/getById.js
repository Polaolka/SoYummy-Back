const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Recipe.findById(id).populate("ingredients.id");

  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = getById;
