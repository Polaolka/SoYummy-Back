const { Recipe } = require("../../models/recipe");
const { Category } = require("../../models/categories");

const mainPage = async (req, res) => {
  const category = await Category.find({}).sort({ name: 1 });
  const recipe = await Recipe.find({}).sort({ createdAt: -1 });

  const response = {};

  category.slice(0, 4).forEach((cat) => {
    const fourRecipes = recipe
      .filter((rec) => rec.category === cat.name)
      .slice(0, 4);

    response[cat.name] = fourRecipes;
  });

  console.log(category);

  res.status(200).json(response);
};

module.exports = mainPage;
