const { Recipes } = require("../../models/recipes");

const getById = async (req, res) => {
  const { id } = req.params;

  const respons = await Recipes.findById(id);

  console.log(id);
  console.log(respons);

  res.status(200).json(respons);
};

module.exports = getById;
