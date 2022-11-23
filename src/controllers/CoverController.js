import BaseController from './BaseController';
import coverService from '../services/coverService'

class CoverController extends BaseController {
  constructor() {
    super()

    this.store = this.store.bind(this)
    this.deleteCover = this.deleteCover.bind(this)
    this.show = this.show.bind(this)
    this.allCovers = this.allCovers.bind(this)
    this.getCoverUsers = this.getCoverUsers.bind(this)
    this.getCoveOtherUsers = this.getCoveOtherUsers.bind(this)
  }

  async store(req, res) {
    try {
      const foto = await coverService.storeService(req.body, req.params);
      return res.json(foto);
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

  async show(req,res){
    try{
      const showCover = await coverService.show(req.params.id)
      this.handleResponse(res, showCover)
    }catch(e){
      this.handleError(res, e)
    }
  }

  async allCovers(req, res) {
    try {
      const cover = await coverService.allCovers(req.query);
      this.handleResponse(res, cover)

    } catch (e) {
      this.handleError(res, e)
    }
  }

  async getCoverUsers(req,res){
    try {

      const watched = await coverService.getCoverUsers(req.actualUser);
      this.handleResponse(res, watched)
    } catch (e) {
      this.handleError(res, e)
    }
  }

  async getCoveOtherUsers(req,res){
    try {
      const {user_id} = req.filter
      const watched = await coverService.getCoveOtherUsers(user_id);
      this.handleResponse(res, watched)
    } catch (e) {
      this.handleError(res, e)
    }
  }

}

export default new CoverController();
