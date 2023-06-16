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
      minlength: 2,
      maxlength: 16,
    },
    token: {
      type: String,
      default: "",
    },
    accesssToken: {
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
          recipeId: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
          name: { type: String },
          measure: [{ type: String }],
          image: { type: String },
        },
      ],
      default: [],
    },
    tenDayFlag: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(1).max(16).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(16).pattern(passRegex).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(16).required(),
});

const addShoppingListItem = Joi.object({
  ingredientId: Joi.objectId().required(),
  recipeId: Joi.objectId().required(),
  measure: Joi.string().allow(null, ""),
});

const removeShoppingListItem = Joi.object({
  ingredientId: Joi.objectId().required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  addShoppingListItem,
  removeShoppingListItem,
  refreshSchema
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
