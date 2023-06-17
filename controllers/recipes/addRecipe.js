const { Recipe } = require("../../models/recipe");
const gravatar = require("gravatar");

const addRecipe = async (req, res) => {
  const { _id: owner, email } = req.user;
  
  const { path } = req.file;

  const { title, description, category, time, ingredients, instructions } = req.body;

  const thumb = path ? path : gravatar.url(email);

  const preview = path ? path : gravatar.url(email);

  const data = {
    title,
    description,
    category,
    time,
    ingredients: JSON.parse(ingredients),
    instructions,
    thumb,
    preview,
  };

  const result = await Recipe.create({ ...data, owner });

  res.status(201).json(result);
};

module.exports = addRecipe;
