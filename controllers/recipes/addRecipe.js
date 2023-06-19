const { Recipe } = require("../../models/recipe");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { congFirstRecipeUser } = require("../../helpers");

const addRecipe = async (req, res) => {
  const { _id: owner, email } = req.user;

  const {
    body: { title, description, category, time, ingredients, instructions },
    file,
  } = req;

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

  const count = await Recipe.countDocuments({ owner });
  const user = await User.findOne({ _id: owner });
  console.log(count);
  const congrats = congFirstRecipeUser(count, user);
  const message = congrats ? congrats : "";
  res.status(201).json({...result._doc, motivation: message});
};

module.exports = addRecipe;
