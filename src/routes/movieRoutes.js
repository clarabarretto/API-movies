import BaseRoute from './baseRoutes';
import movieController from '../controllers/MovieController';
import movieSchema from '../schema/movieSchema';
import uploadImg from '../middlewares/multerVerify'

class MovieRoutes extends BaseRoute {
  setup(){
    this.routes.use(this.LoginRequired)
    this.routes.get('/', movieController.index)
    this.routes.get('/:id', this.schemaValidator.validate(movieSchema.search), movieController.show)
    // this.routes.post('/',this.isAdmin, this.schemaValidator.validate(movieSchema.store), movieController.store)
    this.routes.post('/',this.isAdmin,this.schemaValidator.validate(movieSchema.store),uploadImg.create, movieController.storeTest)
    this.routes.put('/:id',this.isAdmin, this.schemaValidator.validate(movieSchema.update),movieController.update)
    this.routes.delete('/:id',this.isAdmin, this.schemaValidator.validate(movieSchema.search), movieController.delete)

    return this.routes
  }
}

export default new MovieRoutes();

