import multer from 'multer'
import multerConfig from "../config/multerConfig";
import BaseController from './BaseController';
import coverService from '../services/coverService'

const upload = multer(multerConfig).single('cover');

class CoverController extends BaseController  {
  constructor(){
    super()

    this.store = this.store.bind(this)
    this.deleteCover = this.deleteCover.bind(this)
  }

  async store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }
      try {
        const fileData = req.file;
        const { movie_id } = req.params;
        const cover = await coverService.store(fileData, movie_id, req.actualUser);

        return this.handleResponse(res, cover)
      } catch (e) {
        return this.handleError(res, e)

      }
    });
  }

  async deleteCover(req, res){
    try {
      const deletedCover = await coverService.deleteCover(req.params, req.actualUser)
      this.handleResponse(res, deletedCover)
    } catch (e) {

      this.handleError(res, e)
    }
  }


}

export default new CoverController();
