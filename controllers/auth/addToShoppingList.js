const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const { Ingredient } = require("../../models/ingredients");

const addToShoppingList = async (req, res) => {

  const { _id: userId } = req.user;
  const { ingredientId, recipeId, measure } = req.body;

  const ingredient = await Ingredient.findById(ingredientId);

  if (!ingredient) {
    throw RequestError(400, "Controller: Invalid ingredientId");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw RequestError(404, "User not found");
  }

  const existingItem = user.shoppingList.find(
    (item) => item.ingredientId.toString() === ingredientId
  );

  if (existingItem) {
    existingItem.measure.push(measure);
    existingItem.recipeId.push(recipeId);
  } else {
    const newShoppingListItem = {
      ingredientId,
      name: ingredient.name,
      recipeId: [recipeId],
      measure: [measure],
      image: ingredient.img,
    };
    user.shoppingList.push(newShoppingListItem);
  }

  const result = await user.save();

  if (!result) {
    throw RequestError(400, "Bad Request");
  }

  res.status(200).json(result.shoppingList);

};

module.exports = addToShoppingList;
