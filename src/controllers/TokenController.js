import tokenService from '../services/tokenService';
import BaseController from './BaseController';

class TokenController extends BaseController {
  constructor(){
    super()

    this.store = this.store.bind(this)
  }

  async store(req, res) {
    try {
      const token = await tokenService.store(req.data);
      this.handleResponse(res, token)
    } catch (e) {
      this.handleError(res, 'ERROR')
    }
  }
}

export default new TokenController();
