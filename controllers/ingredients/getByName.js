const { Ingredient } = require("../../models/ingredient");
const { RequestError } = require("../../helpers");

const getByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    throw RequestError(400, "Name parameter is required");
  }

  const words = name
    .split(" ")
    .map((word) => `(?=.*${word})`)
    .join("");

  const regex = new RegExp(`^${name}`, "i");

  const count = await Ingredient.countDocuments({ name: regex });
  const response = await Ingredient.find({ name: regex }, "-createdAt -updatedAt");

  res.status(200).json(response);

  if (!response) {
    throw RequestError(404, "Not found");
  }
};

module.exports = getByName;