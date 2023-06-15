const sharp = require("sharp");
const cloudinary = require('cloudinary').v2;

async function resizeIMG(path, width, height) {
  // Зміна розміру зображення за допомогою sharp
  const resizedImageBuffer = await sharp(path)
    .resize(width, height)
    .toBuffer();

  // Завантаження зменшеного зображення на Cloudinary
  const result = await cloudinary.uploader.upload_stream(
    { folder: 'recipeIMG', allowed_formats: ['jpg', 'png', 'webP'] },
    (error, result) => {
      if (error) {
        throw new Error(error.message);
      }
    }
  ).end(resizedImageBuffer);

  return result.secure_url;
}

module.exports = resizeIMG;
