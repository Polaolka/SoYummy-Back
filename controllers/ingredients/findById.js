const { Ingredient } = require("../../models/ingredients");

const findById = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  const respons = await Ingredient.findById(id);
  console.log(respons);

    res.status(200).json(respons);
};
module.exports = findById;
