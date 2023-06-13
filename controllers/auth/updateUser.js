const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const updateUser = async (req, res) => {
  const { _id, name, avatarURL } = req.user;
  // console.log(`"name": ${name}`); 

  const {newName} = req.body;
  // console.log(`"newName": ${newName}`);


    const userName = newName? newName: name;


  // if (!req.file) {
  //   throw RequestError(404, 'Image Not found');
  // }

  // const newAvatarURL = req.file.path;
  const userAvatar = req.file? req.file.path : avatarURL;

const user = await User.findByIdAndUpdate(_id, { $set: { avatarURL: userAvatar, name: userName } }, { new: true });
  // console.log(user);

  res.status(200).json({ _id: user._id, avatarURL: user.avatarURL, name: user.name });
};

module.exports = updateUser;
