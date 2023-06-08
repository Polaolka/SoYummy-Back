const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const recipesSchema = new Schema({
  title: { type: String },
  //   category: { type: String },
  //   area: { type: String },
  //   instructions: { type: String },
  //   description: { type: String },
  //   thumb: { type: String },
  //   preview: { type: String },
  //   time: { type: String },
  //   youtube: { type: String },
  //   tags: { type: Array },
  //   ingredients: { type: Array },
});

recipesSchema.post("save", handleMongooseError);

// const addSchema = Joi.object({
//   // name: Joi.string().min(3).max(30).required(),
// });

// const schemas = {
//   addSchema,
// };

const Recipes = model("recipe", recipesSchema);

module.exports = {
  //   schemas,
  Recipes,
};

//   // title: { type: String, required: [true, "Set title"], minlength: 4 },
// category: {
//   type: String,
//   required: [true, "Set category"],
//   enum: [
//     "Beef",
//     "Breakfast",
//     "Chicken",
//     "Dessert",
//     "Goat",
//     "Lamb",
//     "Miscellaneous",
//     "Pasta",
//     "Pork",
//     "Seafood",
//     "Side",
//     "Starter",
//     "Vegan",
//     "Vegetarian",
//   ],
// },
// instructions: {
//   type: String,
//   required: [true, "Set instructions"],
//   minlength: 10,
// },
// description: {
//   type: String,
//   required: [true, "Set description"],
//   minlength: 10,
// },
// time: { type: String, required: [true, "Set time"] },
// ingredients: { type: Schema.Types.ObjectId, ref: "ingredient" },
// area: { type: String, required: [true, "Set area"], minlength: 4 },
//   thumb: "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg",
//   preview:
//     "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560402/mwtf7uqrnsxvlpjqtslc.jpg",
//   youtube: "https://www.youtube.com/watch?v=e52IL8zYmaE",
//   tags: ["Pasta", "Baking"],-
