import BaseRoute from './baseRoutes';
import movieController from '../controllers/MovieController';
import movieSchema from '../schema/movieSchema';
import loginRequired from '../middlewares/loginRequired';

class MovieRoutes extends BaseRoute {
  setup(){
    this.routes.use(loginRequired)
    this.routes.get('/', movieController.index)
    this.routes.get('/:id', this.schemaValidator.validate(movieSchema.search), movieController.show)
    this.routes.post('/', this.schemaValidator.validate(movieSchema.store), movieController.store)
    this.routes.put('/:id', this.schemaValidator.validate(movieSchema.update),movieController.update)
    this.routes.delete('/:id', this.schemaValidator.validate(movieSchema.search), movieController.delete)

    return this.routes
  }
}

export default new MovieRoutes();

