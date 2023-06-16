const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const ingredientsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for ingredient"],
  },
  desc: {
    type: String,
    required: [true, "Set desc for ingredient"],
  },
  img: {
    type: String,
  },
});

ingredientsSchema.post("ingredient", handleMongooseError);

const getSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be at least 2.",
    "any.required": "The name field is required.",
  }),
});

const schemas = {
  getSchema,
};

const Ingredient = model("ingredient", ingredientsSchema);

module.exports = {
  schemas,
  Ingredient,
};
