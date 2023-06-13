const { Ingredient } = require("../../models/ingredient");

const findById = async (req, res) => {
  const { id } = req.params;

  const respons = await Ingredient.findById(id);

    res.status(200).json(respons);
};
module.exports = findById;
