import coverController from '../controllers/CoverController';
import loginRequired from '../middlewares/loginRequired';
import BaseRoute from '../routes/baseRoutes'

class CoverRoutes extends BaseRoute{
  setup(){
    this.routes.use(loginRequired)
    this.routes.post('/:movie_id', coverController.store)
    this.routes.delete('/delete/:id', coverController.deleteCover)

    return this.routes
  }
}

export default new CoverRoutes();
