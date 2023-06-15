const express = require("express");

const ctrl = require("../../controllers/categories");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/categories");

const { ctrlWrapper } = require("../../helpers");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getCat));

module.exports = router;
