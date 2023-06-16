const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const recipeSchema = new Schema({
  title: { type: String },
  category: { type: String },
  area: { type: String },
  instructions: {
    type: String,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

recipeSchema.post("save", handleMongooseError);

recipeSchema.set("versionKey", false);

const addNewSchema = Joi.object({
  title: Joi.string().required().min(2).messages({
    "string.base": "The title must be a string.",
    "string.min": "The title must be at least 2.",
    "any.required": "The title field is required.",
  }),
  category: Joi.string().required().min(2).messages({
    "string.base": "The category must be a string.",
    "string.min": "The category must be at least 2.",
    "any.required": "The category field is required.",
  }),
  instructions: Joi.string().required().min(2).messages({
    "string.base": "The instructions must be a string.",
    "string.min": "The instructions must be at least 2.",
    "any.required": "The instructions field is required.",
  }),
  description: Joi.string().required().min(2).messages({
    "string.base": "The description must be a string.",
    "string.min": "The description must be at least 2.",
    "any.required": "The description field is required.",
  }),
  thumb: Joi.string().messages({
    "string.base": "The thumb must be a string.",
  }),
  preview: Joi.string().messages({
    "string.base": "The preview must be a string.",
  }),
  time: Joi.string().required().messages({
    "string.base": "The time must be a string.",
    "any.required": "The time field is required.",
  }),
  ingredients: Joi.array().required().messages({
    "array.base": "The ingredients must be a array.",
    "any.required": "The ingredients field is required.",
  }),
  recipeIMG: Joi.object().messages({
    "object.base": "The recipeIMG must be a object.",
  }),
});

const schemas = {
  addNewSchema,
};

const Recipe = model("recipe", recipeSchema);

module.exports = {
  schemas,
  Recipe,
};
