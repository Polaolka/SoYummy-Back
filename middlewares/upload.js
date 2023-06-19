const multer = require("multer");
require("dotenv").config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { RequestError } = require("../helpers");

const {CLOUD_NAME, 
CLOUD_API_KEY, 
CLOUD_API_SECRET} = process.env;

cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: CLOUD_API_KEY, 
  api_secret: CLOUD_API_SECRET, 
});

const recipeStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    if (!file) {
      throw RequestError(404, 'Image Not found');
    }

    let folder;
    if (file.fieldname === 'recipeIMG') {
      folder = 'recipeIMG';
    }  else {
      folder = 'docs';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: file.originalname,
      transformation: [{ width: 500, height: 500 }],
    };
  },
});


const avaStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (!file) {
      throw RequestError(404, 'Image Not found');
    }

    const { id } = req.user;
    let folder;
    if (file.fieldname === 'avatar') {
      folder = 'avatars';
    } else {
      folder = 'docs';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png', 'webp'],
      public_id: `${id}_${file.originalname}`,
      transformation: [{ width: 100, height: 100, crop: 'fill' }],
    };
  },
});

const uploadAva = multer({ storage: avaStorage });
const uploadRecipe = multer({ storage: recipeStorage });

module.exports = { uploadAva, uploadRecipe };
