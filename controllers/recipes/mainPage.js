const { Recipes } = require("../../models/recipes");
const { Category } = require("../../models/categories");

const mainPage = async (req, res) => {
  const category = await Category.find({});
  const recipe = await Recipes.find({});

  const response = {};

  category.forEach((cat) => {
    const fourRecipes = recipe
      .filter((rec) => rec.category === cat.name)
      .slice(0, 4);
    response[cat.name] = fourRecipes;
  });

  res.status(200).json(response);
};

module.exports = mainPage;
