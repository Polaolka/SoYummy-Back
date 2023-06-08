const { Recipe } = require("../../models/recipe");

const getAll = async (req, res) => {

  const conditions = {};
//   const { page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;
  const result = await Recipe.find({});
  res.json(result);
};

module.exports = getAll;