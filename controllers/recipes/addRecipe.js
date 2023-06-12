const { Recipe } = require("../../models/recipe");
const gravatar = require("gravatar");

const addRecipe = async (req, res) => {
  const { _id: owner, email } = req.user;
  const { body } = req;

  console.log(8888888888);
  console.log(body);

  if (!body.thumb) {
    body.thumb = gravatar.url(email);
  }

  if (!body.preview) {
    body.preview = gravatar.url(email);
  }

  const result = await Recipe.create({ ...body, owner });

  res.status(201).json(result);
};

module.exports = addRecipe;
