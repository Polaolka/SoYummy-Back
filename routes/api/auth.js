const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, validateSubscrBody, uploadAva, } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");

// signup
router.post( "/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

// login
router.post( "/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login) );

// logout
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

//  current
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

// avatar
router.patch('/avatar', authenticate, uploadAva.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

router.patch('/shopping-list/add', authenticate, validateBody(schemas.addShoppingListItem), ctrlWrapper(ctrl.addToShoppingList));

router.patch('/shopping-list/remove', authenticate, validateBody(schemas.removeShoppingListItem), ctrlWrapper(ctrl.removeShopingItem));

router.get('/shopping-list', authenticate, ctrlWrapper(ctrl.getShoppingList));


// router.post('/user', authenticate, upload.single('recipeImg'), ctrl.addAvatar);
// router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
