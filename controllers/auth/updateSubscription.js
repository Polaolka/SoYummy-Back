const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result =await User.findByIdAndUpdate(_id, req.body, { new: true, select: '_id name email subscription' });

  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);

};

module.exports = updateSubscription;
