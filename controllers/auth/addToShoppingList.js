const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const addToShoppingList = async (req, res) => {
  const { _id } = req.user;
  const { ingredientId, amount = '', measure = '' } = req.body

  if (
    !isValidObjectId(ingredientId) 
  ) {
    throw HttpError(400)
  }

  const ingrItem = {
    ingredientId,
    amount,
    measure,
  }

  const { shoppingList } = await User.findById(_id)
  shoppingList.unshift(ingrItem)

  const result = await User.findByIdAndUpdate(_id, { shoppingList }, { new: true });

  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(ingrItem);

};

module.exports = addToShoppingList;
