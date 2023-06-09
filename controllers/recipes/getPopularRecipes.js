const { Recipe } = require("../../models/recipe");
const { RequestError, calculatePopularity } = require("../../helpers");




const getPopularRecipes = async (req, res) => {
    const pipeline = calculatePopularity();
    console.log(Recipe);
  
    const respons = await Recipe.aggregate(pipeline);
  
    if (!respons) {
      res.status(404).json({ message: "Not found" });
    }
  
    res.status(200).json(respons);
  };
  
  module.exports = getPopularRecipes;
