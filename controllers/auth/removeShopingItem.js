const { User } = require("../../models/user");
const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../../helpers");

const removeShopingItem = async (req, res) => {
  const { _id } = req.user;
  const { ingredientId } = req.body;

  if (!isValidObjectId(ingredientId)) {
    throw RequestError(400, "Controller: Invalid ingredientId");
  }

  const { shoppingList } = await User.findById(_id);

  const index = shoppingList.findIndex(
    (item) => item.ingredientId.toString() === ingredientId.toString()
  );
  const shoppingItemRemove = shoppingList[index];
  console.log(shoppingItemRemove);

  if (index === -1) {
    throw RequestError(404, "Not found");
  }
  if (index !== -1) {
    shoppingList.splice(index, 1);
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { shoppingList },
    { new: true }
  );

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(shoppingItemRemove);
};

module.exports = removeShopingItem;
