const { Recipe } = require("../../models/recipe");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  const result = await Recipe.findById(id);
  console.log(result);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = getById;
