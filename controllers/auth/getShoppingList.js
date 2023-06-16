const { User } = require("../../models/user");
const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../../helpers");

const getShoppingList = async (req, res) => {
  const { _id, shoppingList } = req.user;

  if (!isValidObjectId(_id)) {
    throw RequestError(400);
  }

  // const { shoppingList } = await User.findById(_id);

   if (!shoppingList) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(shoppingList);
};

module.exports = getShoppingList;