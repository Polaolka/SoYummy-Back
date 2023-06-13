const { Recipe } = require("../../models/recipe");
const gravatar = require("gravatar");

const addRecipe = async (req, res) => {
  const { _id: owner, email } = req.user;
  const { body, file } = req;

  const { title, description, category, time, ingredients, instructions } =
    body;

  const thumb = file ? file.path : gravatar.url(email);

  const preview = file ? file.path : gravatar.url(email);

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
