const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegex,
    },
    name: {
      type: String,
      required: [true, "Set name"],
      minlength: 3,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    shoppingList: [
      {
        ingredientId: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
        recipeId: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
        measure: [{ type: String }],
        image: { type: String },
      }
    ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const addShoppingListItem = Joi.object({
  ingredientId: Joi.objectId().required(),
  recipeId: Joi.objectId().required(),
  measure: Joi.string().allow(null, ''),
})

const removeShoppingListItem = Joi.object({
  recipeId: Joi.array().items(Joi.objectId()).required(),
})

const schemas = {
  registerSchema,
  loginSchema,
  addShoppingListItem,
  removeShoppingListItem
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
