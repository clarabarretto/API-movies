import tokenService from '../services/tokenService';

class TokenController {
  async store(req, res) {
    const token = await tokenService.store(req.data);

    return res.json({ token });
  }
}

export default new TokenController();
