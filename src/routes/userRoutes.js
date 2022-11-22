import BaseRoute from './baseRoutes';
import userController from '../controllers/UserController';
import userSchema from '../schema/userSchema';

class UserRoutes extends BaseRoute {
  setup(){
    this.routes.post('/', this.schemaValidator.validate(userSchema.store), userController.store)

    this.routes.use(this.LoginRequired)
    this.routes.get('/', this.schemaValidator.validate(userSchema.index), userController.index )
    this.routes.get('/profile',  userController.show)
    this.routes.get('/profile/:id', this.schemaValidator.validate(userSchema.search) , userController.redirectUser)
    this.routes.put('/',  this.schemaValidator.validate(userSchema.update), userController.update)
    this.routes.put('/:id',  this.schemaValidator.validate(userSchema.makeAdmin), userController.makeAdmin)
    this.routes.delete('/', userController.delete)
    this.routes.delete('/:id',this.isAdmin,this.schemaValidator.validate(userSchema.search), userController.deleteOtherUser)

    return this.routes
  }
}

export default new UserRoutes()
