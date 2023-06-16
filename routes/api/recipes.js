const express = require("express");

const ctrl = require("../../controllers/recipes");

const {
  validateBody,
  authenticate,
  uploadRecipe,
} = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { isValidId } = require("../../middlewares");

const { schemas } = require("../../models/recipe");

const router = express.Router();

// user recipes
router.get("/own-recipes", authenticate, ctrlWrapper(ctrl.getOwnRecipe));

// Home page
router.get("/main-page", authenticate, ctrlWrapper(ctrl.mainPage));

// receiving recipes by category
router.get(
  "/category/:category",
  authenticate,
  ctrlWrapper(ctrl.getByCategory)
);

// getting popular recipes
router.get(
  "/popular-recipes",
  authenticate,
  ctrlWrapper(ctrl.getPopularRecipes)
);

// receiving recipes that the user has added to favorites
router.get("/favorite", authenticate, ctrlWrapper(ctrl.getFavoruteRecipes));

// adding a recipe to favorites
router.post("/favorite/add", authenticate, ctrlWrapper(ctrl.addToFavRecipes));

// removing a recipe from favorites
router.post(
  "/favorite/remove",
  authenticate,
  ctrlWrapper(ctrl.removeFromFavRecipes)
);

// adding a new recipe
router.post(
  "/add-new",
  authenticate,
  uploadRecipe.single("recipeIMG"),
  ctrlWrapper(ctrl.addRecipe)
);

// deleting a recipe by id
router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteOne));

// search for a recipe by name
router.get("/title", authenticate, ctrlWrapper(ctrl.getByTitle));

// searching for a recipe by ingredient name
router.get("/ingredient", authenticate, ctrlWrapper(ctrl.getByIngredient));

// prescription by id
router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));

module.exports = router;
