import BaseRoute from './baseRoutes';
import userController from '../controllers/UserController';
import userSchema from '../schema/userSchema';

class UserRoutes extends BaseRoute {
  setup(){
    this.routes.post('/',  this.schemaValidator.validate(userSchema.store), userController.store)

    this.routes.use(this.LoginRequired)
    this.routes.get('/', this.schemaValidator.validate(userSchema.index), userController.index )
    this.routes.get('/profile',  userController.show)
    this.routes.put('/',  this.schemaValidator.validate(userSchema.update), userController.update)
    this.routes.delete('/:id?', userController.delete)

    return this.routes
  }
}

export default new UserRoutes()
