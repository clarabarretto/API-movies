import BaseRoute from './baseRoutes';
import UserAcessLogsController from '../controllers/UserAcessLogsController';
import LoginRequired from '../middlewares/loginRequired';

class UserAcessLogsRoutes extends BaseRoute {
  setup() {
    this.routes.post('/', UserAcessLogsController.checkAccessVerification);
    return this.routes;
  }
}

export default new UserAcessLogsRoutes();
