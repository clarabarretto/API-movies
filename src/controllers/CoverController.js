import multer from 'multer'
import Cover from '../models/Cover';
import multerConfig from "../config/multerConfig";

const upload = multer(multerConfig).single('cover');

class CoverController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { movie_id } = req.params;

        const cover = await Cover.create({ originalname, filename, movie_id });

        return res.json(cover);
      } catch (e) {
        return res.status(400).json({
          errors: ['movie does not exist'],
        });
      }
    });
  }
}

export default new CoverController();
