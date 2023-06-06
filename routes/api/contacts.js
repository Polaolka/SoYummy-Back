const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validateBody, validateFavoriteBody, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/contact");

const {ctrlWrapper} = require("../../helpers");

const {isValidId} = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", authenticate, isValidId, validateFavoriteBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeById));


module.exports = router;
