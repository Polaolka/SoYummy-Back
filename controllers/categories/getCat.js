const { Category } = require("../../models/categories");

const getCat = async (req, res) => {
  const response = await Category.find({});

  res.status(200).json(response);
};

module.exports = getCat;
