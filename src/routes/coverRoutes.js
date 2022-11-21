import coverController from '../controllers/CoverController';
import BaseRoute from '../routes/baseRoutes'
import coverSchema from '../schema/coverSchema'
import uploadImg from '../middlewares/multerVerifyPC'

class CoverRoutes extends BaseRoute {
  setup() {

    this.routes.use(this.LoginRequired)
    // como eu fiz
    this.routes.post('/:movie_id', this.upload, this.schemaValidator.validate(coverSchema.store),coverController.store)

    // como pc fe
    this.routes.post('/pc/:movie_id', uploadImg.create, coverController.storePc )



    this.routes.delete('/delete/:id', coverController.deleteCover)
    this.routes.get('/show/:id', coverController.show)
    this.routes.get('/all', coverController.allCovers)
    this.routes.get('/watched', coverController.getCoverUsers)
    this.routes.get('/watched/:user_id',this.schemaValidator.validate(coverSchema.search), coverController.getCoveOtherUsers)

    return this.routes
  }
}

export default new CoverRoutes();
