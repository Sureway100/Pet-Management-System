const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const storage = multer.diskStorage({
  cloudinary,
  params: {
    folder: "../favorite_pet",
    allowed_formats: ["jpg", "png"],
  },
});

const parserx = multer({ storage });

module.exports = parserx;
