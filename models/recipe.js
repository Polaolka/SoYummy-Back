const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const recipeSchema = new Schema({
  title: { type: String },
  category: { type: String },
  area: { type: String },
  instructions: { type: String },
  description: { type: String },
  thumb: { type: String },
  preview: { type: String },
  time: { type: String },
  youtube: { type: String },
  tags: { type: Array },
  ingredients: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "ingredient",
      },
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

recipeSchema.post("save", handleMongooseError);

const addNewSchema = Joi.object({
  title: Joi.string().required().min(5),
  category: Joi.string().required().min(5),
  instructions: Joi.string().required().min(5),
  description: Joi.string().required().min(5),
  thumb: Joi.string(),
  preview: Joi.string(),
  time: Joi.string().required(),
  ingredients: Joi.array().required(),
});

const schemas = {
  addNewSchema,
};

const Recipe = model("recipe", recipeSchema);

module.exports = {
  schemas,
  Recipe,
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
