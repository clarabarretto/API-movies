import BaseRoute from './baseRoutes';
import userController from '../controllers/UserController';
import userSchema from '../schema/userSchema';
import loginRequired from '../middlewares/loginRequired';

class UserRoutes extends BaseRoute {
  setup(){
    this.routes.use(loginRequired)
    this.routes.get('/', userController.index )
    this.routes.get('/profile',  userController.show)
    this.routes.post('/',  this.schemaValidator.validate(userSchema.store), userController.store)
    this.routes.put('/',  this.schemaValidator.validate(userSchema.update), userController.update)
    this.routes.delete('/:id',  this.schemaValidator.validate(userSchema.delete), userController.delete)

    return this.routes
  }
}

export default new UserRoutes()
