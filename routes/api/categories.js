const express = require("express");

const ctrl = require("../../controllers/categories");

const { authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getCategories));

module.exports = router;
