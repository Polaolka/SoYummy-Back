const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

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
    shoppingList: {
      type: Array,
      default: [],
    },
    // daysInApp: {
    //   type: Number,
    //   default: null,
    // }


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

const shoppingSchema = Joi.object({
  ingredientId: Joi.string().required(),
  amount: Joi.string().required(),
  measure: Joi.string().required(),
});

const shoppingRemoveSchema = Joi.object({
  ingredientId: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  shoppingSchema,
  shoppingRemoveSchema
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
