const { Recipe } = require("../../models/recipe");
const { RequestError, calculatePopularity } = require("../../helpers");




const getPopularRecipes = async (req, res) => {
    const pipeline = calculatePopularity();
  
    const respons = await Recipe.aggregate(pipeline);
  
    if (!respons) {
        throw RequestError(404, "Not found");
    }
  
    res.status(200).json(respons);
  };
  
  module.exports = getPopularRecipes;
