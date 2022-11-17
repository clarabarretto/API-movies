import BaseRoute from './baseRoutes';
import WatchedController from '../controllers/WatchedController';
import watchedSchema from '../schema/watchedSchema';

class WatchedRoutes extends BaseRoute {
  setup(){
    this.routes.use(this.LoginRequired)
    this.routes.get('/', WatchedController.index)
    this.routes.get('/:movie_id', WatchedController.checkWatched)
    this.routes.get('/profile/', this.schemaValidator.validate(watchedSchema.show), WatchedController.show)
    this.routes.post('/', this.schemaValidator.validate(watchedSchema.store), WatchedController.store)
    this.routes.put('/:movie_id', this.schemaValidator.validate(watchedSchema.update), WatchedController.update)
    this.routes.delete('/:movie_id', this.schemaValidator.validate(watchedSchema.search), WatchedController.delete)

    return this.routes
  }
}

export default new WatchedRoutes();
