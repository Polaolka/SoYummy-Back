const { Recipes } = require("../../models/recipes");

const getById = async (req, res) => {
  const { id } = req.params;

  const respons = await Recipes.findById(id);

  if (!respons) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(respons);
};

module.exports = getById;
