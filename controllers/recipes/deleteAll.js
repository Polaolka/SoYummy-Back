const { Recipe } = require("../../models/recipe");

const deleteAllRecipes = async (req, res) => {
  try {
    const result = await Recipe.deleteMany();
    res.status(200).json({ message: "All recipes have been deleted." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipes." });
  }
};

module.exports = deleteAllRecipes;