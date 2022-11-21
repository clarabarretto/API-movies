const { extname } = require("path");
const multer = require("multer");
const fs = require("fs");
const multerConfig = require("../config/multerConfigPC");
// const fg =require("")

const upload = multer(multerConfig).single("img");

module.exports = {
  create(req, res, next) {
    return upload(req, res, async (err) => {
      const { file, name } = req.body;

      const img = file;

      let imagemReq = "";

      if (img.substring(11, 14) === "jpeg") {
        imagemReq = img.replace(/^data:image\/jpg;base64,/, "");
      }

      if (img.substring(11, 14) === "jpg") {
        imagemReq = img.replace(/^data:image\/jpeg;base64,/, "");
      }

      if (img.substring(11, 14) === "png") {
        imagemReq = img.replace(/^data:image\/png;base64,/, "");
      }

      const filename = name.substring(0, 4) + extname(name);
      // '..', '..', '..', 'Frontend', 'assets', 'covers'
      const filePath = `../../../Frontend/assets/covers/${filename}`;

      console.log(filePath)
      req.body = { filename, name };

      fs.writeFileSync(filePath, imagemReq, "base64", (error) => {
        if (error) {
          return res.json(error);
        }
        return "";
      });
      if (err) {
        return res.status(400).json({ errors: [err] });
      }

      return next();
    });
  },
};
