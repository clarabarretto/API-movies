import coverController from '../controllers/CoverController';
import BaseRoute from '../routes/baseRoutes'
import coverSchema from '../schema/coverSchema'
import uploadImg from '../middlewares/multerVerify'

class CoverRoutes extends BaseRoute {
  setup() {

    this.routes.use(this.LoginRequired)
    this.routes.post('/:movie_id', uploadImg.create, coverController.store )
    this.routes.delete('/delete/:id', coverController.deleteCover)
    this.routes.get('/show/:id', coverController.show)
    this.routes.get('/all', coverController.allCovers)
    this.routes.get('/index', coverController.findAllCovers)
    this.routes.get('/watched', coverController.getCoverUsers)
    this.routes.get('/watched/:user_id',this.schemaValidator.validate(coverSchema.search), coverController.getCoveOtherUsers)

    return this.routes
  }
}

export default new CoverRoutes();
