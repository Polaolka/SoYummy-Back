const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const conditions = {
    owner,
  };
  const { favorite } = req.query;
  if (favorite !== undefined) conditions.favorite = favorite;
  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(conditions, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email subscription");
  res.json(result);
};

module.exports = getAll;
