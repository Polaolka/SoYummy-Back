const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;

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
      minlength: 1,
      maxlength: 16,
    },
    token: {
      type: String,
      default: "",
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    shoppingList: {
      type: [
        {
          ingredientId: { type: Schema.Types.ObjectId, ref: "Ingredient" },
          recipeIds: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
          name: { type: String },
          measures: [{ type: String }],
          image: { type: String },
        },
      ],
      default: [],
    },
    tenDayFlag: { type: Boolean, default: false },
    firstDayFlag: { type: Boolean, default: false },
    firstRecipeFlag: { type: Boolean, default: false },
    tenFavRecipesFlag: { type: Boolean, default: false },
    isSubscribe: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(1).max(16).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be at least 1.",
    "string.max": "The name cannot exceed 16.",
    "any.required": "The name field is required.",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": "The email must be a string.",
    "string.pattern": "The email must be a valid email address.",
    "any.required": "The email field is required.",
  }),
  password: Joi.string().min(6).max(16).pattern(passRegex).required().messages({
    "string.base": "The password must be a string.",
    "string.min": "The password must be at least 6.",
    "string.max": "The password cannot exceed 16.",
    "string.pattern": "The email must be a valid password address.",
    "any.required": "The password field is required.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": "The email must be a string.",
    "string.pattern": "The email must be a valid email address.",
    "any.required": "The email field is required.",
  }),
  password: Joi.string().min(6).max(16).required().messages({
    "string.base": "The password must be a string.",
    "string.min": "The password must be at least 6.",
    "string.max": "The password cannot exceed 16.",
    "any.required": "The password field is required.",
  }),
});

const addShoppingListItem = Joi.object({
  ingredientId: Joi.objectId().required().messages({
    "objectId.base": "The ingredientId must be a objectId.",
    "any.required": "The ingredientId field is required.",
  }),
  recipeId: Joi.objectId().required().messages({
    "objectId.base": "The recipeId must be a objectId.",
    "any.required": "The recipeId field is required.",
  }),
  measure: Joi.string().allow(null, "").messages({
    "string.base": "The measure must be a string.",
    "any.required": "The measure field is required.",
  }),
});

const removeShoppingListItem = Joi.object({
  ingredientId: Joi.objectId().required().messages({
    "objectId.base": "The ingredientId must be a objectId.",
    "any.required": "The ingredientId field is required.",
  }),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().messages({
    "string.base": "The refreshToken must be a string.",
    "any.required": "The refreshToken field is required.",
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  addShoppingListItem,
  removeShoppingListItem,
  refreshSchema,
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
