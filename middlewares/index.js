const {
  validateBody,
  validateFavoriteBody,
  validateSubscrBody,
} = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateFavoriteBody,
  validateBody,
  isValidId,
  authenticate,
  validateSubscrBody,
  upload,
};
