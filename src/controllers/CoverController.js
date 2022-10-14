import BaseController from './BaseController';
import coverService from '../services/coverService'

class CoverController extends BaseController {
  constructor() {
    super()

    this.store = this.store.bind(this)
    this.deleteCover = this.deleteCover.bind(this)
  }

  async store(req, res) {

    try {
      const fileData = req.data;
      const { movie_id } = req.params;
      const cover = await coverService.store(fileData, movie_id, req.actualUser);

      return this.handleResponse(res, cover)
    } catch (e) {
      return this.handleError(res, e)
    }
  }

  async deleteCover(req, res) {
    try {
      const deletedCover = await coverService.deleteCover(req.params, req.actualUser)
      this.handleResponse(res, deletedCover)
    } catch (e) {

      this.handleError(res, e)
    }
  }


}

export default new CoverController();
