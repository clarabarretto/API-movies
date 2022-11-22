import BaseRoute from './baseRoutes';
import RecoveryController from '../controllers/RecoveryController';
import RecoverySchema from '../schema/RecoverySchema';

class RecorveryRoutes extends BaseRoute {
  setup() {
    this.routes.post('/recovery_password', this.schemaValidator.validate(RecoverySchema.recovery), RecoveryController.recovery);
    this.routes.get('/validate-token-password/:token', this.schemaValidator.validate(RecoverySchema.token), RecoveryController.validateToken);
    this.routes.put('/change-password/:token', this.schemaValidator.validate(RecoverySchema.change), RecoveryController.changePassword);

    return this.routes;
  }
}

export default new RecorveryRoutes();
