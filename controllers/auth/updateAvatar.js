const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const Jimp = require("jimp");
const { User } = require("../../models/user");


const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);

  Jimp.read(`${resultUpload}`, (err, image) => {
    if (err) throw err;
    image
      .resize(250, 250)
      .quality(100)
      .write(`${resultUpload}`);
  });

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = updateAvatar;
