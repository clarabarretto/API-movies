import tokenService from '../services/tokenService';
import BaseController from './BaseController';

class TokenController {
  async store(req, res) {
    try {
      const token = await tokenService.store(req.data);
      return BaseController.handleResponse(res, {token})
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')
    }
  }
}

export default new TokenController();
