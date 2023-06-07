const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for category"],
    },
  },
  { versionKey: false, timestamps: true }
);

categorySchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

const schemas = {
  addSchema,
};

const Category = model("category", categorySchema);

module.exports = {
  schemas,
  Category,
};
