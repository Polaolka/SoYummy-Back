const express = require("express");

const ctrl = require("../../controllers/recipes");

const { validateBody, authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/main-page", authenticate, ctrlWrapper(ctrl.mainPage));
router.get(
  "/category/:category",
  authenticate,
  ctrlWrapper(ctrl.getByCategory)
);
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
