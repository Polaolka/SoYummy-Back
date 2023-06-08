const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
 
  if (!req.file) {
    throw RequestError(404, 'Image Not found');
  }
  const avatarURL = req.file.path;

  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;
