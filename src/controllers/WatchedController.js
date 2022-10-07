import watchedService from '../services/watchedService';
import BaseController from './BaseController'

class WatchedController extends BaseController {
  async index(req, res) {
    try {
      const movies = await watchedService.index(req.actualUser);
      return BaseController.handleResponse(res, movies)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')
    }
  }

  async show(req, res) {
    try {
      const movie = await watchedService.show(req.actualUser);
      return BaseController.handleResponse(res, movie)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')
    }
  }

  async store(req, res) {
    try {
      const newMovie = await watchedService.store(req.actualUser, req.data);
      return BaseController.handleResponse(res, newMovie)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')
    }
  }

  async delete(req, res) {
    try {
      const deletedMovie = await watchedService.deleteWatched(req.filter, req.actualUser);

      return BaseController.handleResponse(res, deletedMovie)
    } catch (e) {
      console.log(e);
      return BaseController.handleError(res, 'ERROR')
    }
  }

  async update(req, res) {
    try {
      const updatedMovie = await watchedService.update(req.filter, req.data, req.actualUser);

      return BaseController.handleResponse(res, updatedMovie)
    } catch (e) {
      console.log(e);
      return BaseController.handleError(res, 'ERROR')
    }
  }
}

export default new WatchedController();
