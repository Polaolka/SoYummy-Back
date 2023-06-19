const { User } = require("../../models/user");

const subscribe = async (req, res) => {
  const { _id: userId, name } = req.user;

  const response = await User.findByIdAndUpdate(
    userId,
    { isSubscribe: true },
    { new: true }
  );
  console.log(response);

  res.status(201).json({ massege: `User ${name} was Subscribe`, response });
};

module.exports = subscribe;
