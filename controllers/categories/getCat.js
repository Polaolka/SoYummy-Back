const { Category } = require("../../models/categories");

const getCat = async (req, res) => {
  const response = await Category.find({}).sort({ name: 1 });

  const sortResponse = response.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  res.status(200).json(sortResponse);
};

module.exports = getCat;
