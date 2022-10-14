import multer from 'multer';
import { extname, resolve } from 'path';

const randomFunction = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {

    // if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
    //   return cb('file must be PNG or JPG');
    // }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randomFunction()}${extname(file.originalname)}`);
    },
  }),
};



