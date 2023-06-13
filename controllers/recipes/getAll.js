const { Recipe } = require("../../models/recipe");
const { Ingredient } = require("../../models/ingredient");
const { RequestError } = require("../../helpers");

const getAll = async (req, res) => {
  const { path } = req.route;
  const { filter } = req.query;

  // const { page, skip, limit } = req.paginatedResponse;

  const searchParams = {};

  if (filter?.title) searchParams.title = filter.title;

  if (filter?.ingredients) {
    const ingTitle = filter?.ingredients;

    const ingredients = await Ingredient.find(
      { name: { $regex: ingTitle, $options: "i" } },
      { _id: 1 }
    );

    searchParams.ingredients = ingredients;
  }

  // console.log(searchParams);

  const response = await Recipe.find(
    searchParams,
    "-createdAt -updatedAt"
    // {skip, limit}
  ).populate("ingredients.id");

  // console.log(response);
  res.status(200).json(response);

  if (!response) {
    throw RequestError(404, "Not found");
  }
};

module.exports = getAll;
