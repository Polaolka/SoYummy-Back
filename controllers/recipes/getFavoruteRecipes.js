const { Recipe } = require("../../models/recipe");


const getFavoruteRecipes= async (req, res) => {
    const { _id } = req.user; // Ідентифікатор користувача
    // const { recipes } = req.body; // Масив об'єктів рецептів
    const allRecipes = await Recipe.find({});
    console.log(_id);

  
    const favoriteRecipes = allRecipes.filter(recipe => {
      const hasPopularity = recipe.popularity.some(item => _id.equals(item.id));
      return hasPopularity;
    });
  console.log(favoriteRecipes);
    res.json({ code: 200, message: 'success', favoriteRecipes });
  };
  
  module.exports = getFavoruteRecipes ;