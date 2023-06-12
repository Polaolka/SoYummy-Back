const express = require("express");

const ctrl = require("../../controllers/ingredients");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/ingredients");

const { ctrlWrapper } = require("../../helpers");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/list", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/name", authenticate, validateBody(schemas.getSchema), ctrlWrapper(ctrl.getByName));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.findById));

// router.post(
//   "/",
//   authenticate,
//   validateBody(schemas.addSchema),
//   ctrlWrapper(ctrl.add)
// );

// router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
