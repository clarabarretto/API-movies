import BaseController from "./BaseController";
import recoveryService from "../services/recoveryService"


class RecoveryController extends BaseController {
  constructor() {
    super();

    this.recovery = this.recovery.bind(this);
    this.validateToken = this.validateToken.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async recovery(req, res) {
    try {
      const user = await recoveryService.recovery(req.data);

      return this.handleResponse(res, user);
    } catch (e) {
      return this.handleError(res, e);
    }
  }

  async validateToken(req, res) {
    try {
      const validate = await recoveryService.validateToken(req.filter.token);
      return this.handleResponse(res, validate);
    } catch (e) {
      return this.handleError(res, e);
    }
  }

  async changePassword(req, res) {
    try {
      const changes = { password: req.data.password };
      const { token } = req.params;
      const ip = req.socket.remoteAddress;

      await recoveryService.changePassword(changes, token, ip);
      return this.handleResponse(res, recoveryService);
    } catch (e) {
      return this.handleError(res, e);
    }
  }
}

export default new RecoveryController();
