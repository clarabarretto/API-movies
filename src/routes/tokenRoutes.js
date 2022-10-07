import BaseRoute from './baseRoutes';
import tokenController from '../controllers/TokenController';
import tokenSchema from '../schema/tokenSchema';

class tokenRoutes extends BaseRoute {
  setup(){
    this.routes.post('/',this.schemaValidator.validate(tokenSchema.store), tokenController.store)

    return this.routes
  }
}
export default new tokenRoutes();
