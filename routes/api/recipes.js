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

// router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

// рецепти користувача
router.get("/own-recipes", authenticate, ctrlWrapper(ctrl.getOwnRecipe));

// головна сторінка
router.get("/main-page", authenticate, ctrlWrapper(ctrl.mainPage));

// отримання рецептів по категорії
router.get(
  "/category/:category",
  authenticate,
  ctrlWrapper(ctrl.getByCategory)
);


// отримання популярних рецептів
router.get(
  "/popular-recipes",
  authenticate,
  ctrlWrapper(ctrl.getPopularRecipes)
);

// отримання рецептів, які юзер додав в улюблені
router.get("/favorite", authenticate, ctrlWrapper(ctrl.getFavoruteRecipes));


// додавання рецепта в улюблені
router.post("/favorite/add", authenticate, ctrlWrapper(ctrl.addToFavRecipes));

// видалення рецепту з улюблених
router.post(
  "/favorite/remove",
  authenticate,
  ctrlWrapper(ctrl.removeFromFavRecipes)
);

// додавання нового рецепту
router.post(
  "/add-new",
  authenticate,
  uploadRecipe.single("recipeIMG"),
  // validateBody(schemas.addNewSchema),
  ctrlWrapper(ctrl.addRecipe)
);

// видалення рецепту по id
router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteOne));


// пошук рецепта по назві
router.get("/title", authenticate, ctrlWrapper(ctrl.getByTitle));

// пошук рецепта по назві інгредієнта
router.get("/ingredient", authenticate, ctrlWrapper(ctrl.getByIngredient));

// рецепт по id
router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));

module.exports = router;
