const express = require("express");

const ctrl = require("../../controllers/recipes");

const { validateBody, authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { isValidId } = require("../../middlewares");

const { schemas } = require("../../models/recipe");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/own-recipes", authenticate, ctrlWrapper(ctrl.getOwnRecipe));

router.get("/main-page", authenticate, ctrlWrapper(ctrl.mainPage));

router.get(
  "/category/:category",
  authenticate,
  ctrlWrapper(ctrl.getByCategory)
);

router.get(
  "/popular-recipe",
  authenticate,
  ctrlWrapper(ctrl.getPopularRecipes)
);

router.post(
  "/add-popularity",
  authenticate,
  ctrlWrapper(ctrl.addPopulatityArr)
);

router.post(
  "/add-new",
  authenticate,
  validateBody(schemas.addNewSchema),
  ctrlWrapper(ctrl.addRecipe)
);

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteOne));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));

// router.post(
//   "/",
//   (req, res, next) => {
//     console.log(22222);
//     next();
//   },
//   authenticate,
//   validateBody(schemas.addSchema),
//   ctrlWrapper(ctrl.add)
// );

// router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
