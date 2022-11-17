import watchedService from '../services/watchedService';
import BaseController from './BaseController'

class WatchedController extends BaseController {
  constructor(){
    super()

    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
    this.store = this.store.bind(this)
    this.delete = this.delete.bind(this)
    this.update = this.update.bind(this)
    this.checkWatched = this.checkWatched.bind(this)
  }

  async index(req, res) {
    try {
      const movies = await watchedService.index(req.actualUser);
      this.handleResponse(res, movies)
    } catch (e) {
      this.handleError(res, 'ERROR')
    }
  }

  async show(req, res) {
    try {
      const movie = await watchedService.show(req.actualUser);
      this.handleResponse(res, movie)
    } catch (e) {
      this.handleError(res, 'ERROR')
    }
  }

  async store(req, res) {
    try {
      const newMovie = await watchedService.store(req.actualUser, req.data);
      this.handleResponse(res, newMovie)
    } catch (e) {
      this.handleError(res, 'ERROR')
    }
  }

  async delete(req, res) {
    try {
      const deletedMovie = await watchedService.deleteWatched(req.filter, req.actualUser);

      this.handleResponse(res, deletedMovie)
    } catch (e) {

      this.handleError(res, 'ERROR')
    }
  }

  async update(req, res) {
    try {
      const updatedMovie = await watchedService.update(req.filter, req.data, req.actualUser);

      this.handleResponse(res, updatedMovie)
    } catch (e) {

      this.handleError(res, 'ERROR')
    }
  }

  async checkWatched(req, res) {
    try {
      const movie = await watchedService.checkWatched(req.actualUser, req.params);
      this.handleResponse(res, movie)
    } catch (e) {
      this.handleError(res, 'ERROR')
    }
}
}

export default new WatchedController();
