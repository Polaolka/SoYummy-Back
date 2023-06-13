const { Recipe } = require("../../models/recipe");
const gravatar = require("gravatar");

const addRecipe = async (req, res) => {
  const { _id: owner, email } = req.user;
  const { body, file } = req;

  console.log(body);

  if (!body.thumb) {
    body.thumb = file ? file.path : gravatar.url(email);
  }

  if (!body.preview) {
    body.preview = file ? file.path : gravatar.url(email);
  }

  const result = await Recipe.create({ ...body, owner });

  res.status(201).json(result);
};

module.exports = addRecipe;
