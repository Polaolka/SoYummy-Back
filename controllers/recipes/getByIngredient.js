const { Recipe } = require("../../models/recipe");
const { Ingredient } = require("../../models/ingredient");
const { RequestError } = require("../../helpers");
const mongoose = require("mongoose");

const getByIngredient = async (req, res) => {
  const { ingredient } = req.query;

  const ObjectId = mongoose.Types.ObjectId;

  if (!ingredient) {
    throw RequestError(400, "Ingredient parameter is required");
  }

  const regex = new RegExp(`.*${ingredient}.*`, "i");

  const ingredientIds = await Ingredient.find({ name: regex }, { _id: 1 });
  console.log(ingredientIds);

  if (ingredientIds.length === 0) {
    throw RequestError(400, "Bad request");
  }

  const ingredientObjectIds = ingredientIds.map((id) => ObjectId(id._id));

  const ingredientStringIds = ingredientIds.map((id) => id._id.toString());


  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;



  const totalStr = await Recipe.countDocuments({
    ingredients: {
      $elemMatch: {
        id: { $in: ingredientStringIds },
      },
    },
  });

  const recipesStr = await Recipe.find({
    ingredients: {
      $elemMatch: {
        id: { $in: ingredientStringIds },
      },
    },
  })
    .populate("ingredients.id")
    .skip(skip)
    .limit(limit);

  if (recipesStr.length === 0) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json({ recipes: recipesStr, total: totalStr });
};

module.exports = getByIngredient;

// const { Recipe } = require("../../models/recipe");
// const { Ingredient } = require("../../models/ingredient");
// const { RequestError } = require("../../helpers");
// const mongoose = require("mongoose");

// const getByIngredient = async (req, res) => {
//   const { ingredient } = req.query;
//   console.log(ingredient);

//   if (!ingredient) {
//     throw RequestError(400, "Ingredient parameter is required");
//   }

//   // const regex = new RegExp(`.*${ingredient}.*`, "i");
//   const regex = new RegExp(`.*${ingredient}.*`, "i");

//   const ingredientIds = await Ingredient.find({ name: regex }, { _id: 1 });

//   console.log(ingredientIds);

//   if (ingredientIds.length === 0) {
//     throw RequestError(400, "Bad request");
//   }

//   // const ingredientObjectIds = ingredientIds.map((id) =>
//   //   mongoose.Types.ObjectId(id)
//   // );
//   // console.log(ingredientObjectIds);

//   const ingredientStrings = ingredientIds.map((id) => id._id.toString());
//   console.log(ingredientStrings);
//   const { page = 1, limit = 1 } = req.query;
//   const skip = (page - 1) * limit;

//   const total = await Recipe.countDocuments({
//     ingredients: { $elemMatch: { id: { $in: ingredientStrings } } },
//   });
//   console.log(total);
//   const recipes = await Recipe.find({
//     ingredients: { $elemMatch: { id: { $in: ingredientStrings } } },
//   })
//     .populate("ingredients.id")
//     .skip(skip)
//     .limit(limit);
//   if (recipes.length === 0) {
//     throw RequestError(404, "Not found");
//   }

//   res.status(200).json({ recipes, total });
// };

// module.exports = getByIngredient;
