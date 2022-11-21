const multer = require("multer");
const { resolve } = require("path");

const path = resolve(__dirname, "..", "public", "img", "products");

module.exports = multer({
  fileFilter: (req, file, callback) => {
    const imageExtention = ["image/png", "image/jpg", "image/jpeg"].find(
      (acceptFormat) => acceptFormat == file.mimetype
    );
    if (!imageExtention) {
      return callback(null, "Nao suportada!");
    }
    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path);
    },
    filename: (req, file, callback) => {
      const uniqueDate = Date.now();
      const fileFormat = file.mimetype.split("/");
      const fileName = file.originalname.split(".");

      callback(null, `${fileName[0]}.${fileFormat[fileFormat.length - 1]}`);
    },
  }),
});
