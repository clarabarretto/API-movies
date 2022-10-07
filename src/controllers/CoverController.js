import multer from 'multer'
import Cover from '../models/Cover';
import multerConfig from "../config/multerConfig";
import BaseController from './BaseController';

const upload = multer(multerConfig).single('cover');

class CoverController extends BaseController  {
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

        return BaseController.handleResponse(res, cover)
      } catch (e) {
        return BaseController.handleError(res, 'error while posting a cover')

      }
    });
  }
}

export default new CoverController();
