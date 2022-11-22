import BaseController from './BaseController';
import UserAcessLogsService from '../services/userAcessLogsService';

class UserAcessLogsController extends BaseController {
  constructor() {
    super();

    this.checkAccessVerification = this.checkAccessVerification.bind(this);
  }

  async checkAccessVerification(req, res) {
    try {
      const filter = {
        user_id: req.id,
      };

      const accessLogs = await UserAcessLogsService.checkAccessVerification(filter);

      return this.handleResponse(res, accessLogs);
    } catch (err) {
      return this.handleError(res, err);
    }
  }
}

export default new UserAcessLogsController();
