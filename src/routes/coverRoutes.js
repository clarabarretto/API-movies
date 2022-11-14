import coverController from '../controllers/CoverController';
import BaseRoute from '../routes/baseRoutes'
import coverSchema from '../schema/coverSchema'

class CoverRoutes extends BaseRoute {
  setup() {
    // this.routes.use(this.isAdmin)
    this.routes.use(this.LoginRequired)
    this.routes.post('/:movie_id', this.upload, this.schemaValidator.validate(coverSchema.store),coverController.store)
    this.routes.delete('/delete/:id', coverController.deleteCover)
    this.routes.get('/show/:id', coverController.show)
    this.routes.get('/all', coverController.allCovers)
    this.routes.get('/watched', coverController.getCoverUsers)

    return this.routes
  }
}

export default new CoverRoutes();
