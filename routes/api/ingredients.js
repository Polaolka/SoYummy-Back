const express = require("express");

const ctrl = require("../../controllers/ingredients");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/ingredient");

const { ctrlWrapper } = require("../../helpers");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/list", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/name", authenticate, ctrlWrapper(ctrl.getByName));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.findById));

module.exports = router;
