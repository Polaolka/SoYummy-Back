const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const { Ingredient } = require("../../models/ingredient");

const addToShoppingList = async (req, res) => {

  const { _id: userId } = req.user;
  const { ingredientId, recipeId, measure } = req.body;

  const ingredient = await Ingredient.findById(ingredientId);

  if (!ingredient) {
    throw RequestError(400, "Controller: Invalid ingredientId");
  }


  const user = req.user;

  const existingItem = user.shoppingList.find(
    (item) => item.ingredientId.toString() === ingredientId
  );

  if (existingItem) {
    existingItem.measures.push(measure);
    existingItem.recipeIds.push(recipeId);
  } else {
    const newShoppingListItem = {
      ingredientId,
      name: ingredient.name,
      recipeIds: [recipeId],
      measures: [measure],
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
