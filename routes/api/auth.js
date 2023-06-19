const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, uploadAva } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");

// signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

// login
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

// logout
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

// refresh
router.post(
  "/refresh",
  validateBody(schemas.refreshSchema),
  ctrlWrapper(ctrl.refresh)
);

//  current
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

// update user`s name or avatar
router.patch(
  "/update-user",
  authenticate,
  uploadAva.single("avatar"),
  ctrlWrapper(ctrl.updateUser)
);

router.patch(
  "/shopping-list/add",
  authenticate,
  validateBody(schemas.addShoppingListItem),
  ctrlWrapper(ctrl.addToShoppingList)
);

router.patch(
  "/shopping-list/remove",
  authenticate,
  validateBody(schemas.removeShoppingListItem),
  ctrlWrapper(ctrl.removeShopingItem)
);

router.get("/shopping-list", authenticate, ctrlWrapper(ctrl.getShoppingList));

router.patch("/subscribe", authenticate, ctrlWrapper(ctrl.subscribe));

module.exports = router;
