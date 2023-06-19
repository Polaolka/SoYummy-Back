const { Recipe } = require("../../models/recipe");
const { Category } = require("../../models/categories");
const { getRandomProperty } = require("../../helpers");

const mainPage = async (req, res) => {
  const category = await Category.find({}).sort({ name: 1 });
  const recipe = await Recipe.find({}).sort({ createdAt: -1 });

  const allCategoryAndFourRecipe = {};

  category.forEach((cat) => {
    const fourRecipes = recipe
      .filter((rec) => rec.category === cat.name)
      .slice(0, 4);

    allCategoryAndFourRecipe[cat.name] = fourRecipes;
  });

  const response = {};

  while (Object.keys(response).length < 4) {
    const randomProperty = getRandomProperty(allCategoryAndFourRecipe);
    const randomValue = allCategoryAndFourRecipe[randomProperty];

    if (!response.hasOwnProperty(randomProperty) && randomValue.length === 4) {
      response[randomProperty] = randomValue;
    }
  }

  res.status(200).json(response);
};

module.exports = mainPage;
