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
  popularity: { type: Array },
  ingredients: [
    {
      _id: false,
      id: {
        type: Schema.Types.ObjectId,
        ref: "ingredient",
      },
      measure: { type: String },
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

recipeSchema.post("save", handleMongooseError);

recipeSchema.set("versionKey", false);

const addNewSchema = Joi.object({
  title: Joi.string().required().min(2),
  category: Joi.string().required().min(2),
  instructions: Joi.string().required().min(2),
  description: Joi.string().required().min(2),
  thumb: Joi.string(),
  preview: Joi.string(),
  time: Joi.string().required(),
  ingredients: Joi.array().required(),
  recipeIMG: Joi.string(),
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

[
  { id: "640c2dd963a319ea671e36d7", measure: "250g" },
  { id: "640c2dd963a319ea671e367e", measure: "125g" },
];
