const { Ingredient } = require("../../models/ingredients");

const getAll = async (req, res) => {
  const respons = await Ingredient.find({});

  res.status(200).json(respons);
};
module.exports = getAll;
