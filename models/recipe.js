const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const recipeSchema = new Schema(
  {
    title: { type: String },
    category: { type: String },
    area: { type: String },
    instructions: {
      type: String,
      required: true,
      set: (arr) => arr.join("\r\n"),
    },
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
          type: String,
          ref: "ingredient",
        },
        measure: { type: String },
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
      },
    }, // преобразование ответа без квадратных скобок
  }
);

recipeSchema.post("save", handleMongooseError);

recipeSchema.set("versionKey", false);

const addNewSchema = Joi.object({
  title: Joi.string().required().min(2),
  category: Joi.string().required().min(2),
  instructions: Joi.array().required().min(2),
  description: Joi.string().required().min(2),
  thumb: Joi.string(),
  preview: Joi.string(),
  time: Joi.string().required(),
  ingredients: Joi.array().required(),
  recipeIMG: Joi.object(),
});

const schemas = {
  addNewSchema,
};

const Recipe = model("recipe", recipeSchema);

module.exports = {
  schemas,
  Recipe,
};
