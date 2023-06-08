const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const ingredientsSchema = new Schema(
  {
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
  }
  //   { versionKey: false, timestamps: true }
);

ingredientsSchema.post("ingredient", handleMongooseError);

const addSchema = Joi.object({
  //   name: Joi.string().min(3).max(30).required(),
});

const schemas = {
  addSchema,
};

const Ingredient = model("ingredient", ingredientsSchema);

module.exports = {
  schemas,
  Ingredient,
};
