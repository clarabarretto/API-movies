import movieService from '../services/movieService';
import BaseController from './BaseController';

class MovieController extends BaseController {
  async index(req, res) {
    try {
      const movies = await movieService.index(req.actualUser);
      return BaseController.handleResponse(res, movies)
    } catch (e) {
      return BaseController.handleError(res, 'error while listing all movies')
    }
  }

  async show(req, res) {
    try {
      const { id } = req.filter;
      const movie = await movieService.show(id, req.actualUser);
      return BaseController.handleResponse(res, movie)
    } catch (e) {
      return BaseController.handleError(res, 'error while getting a movie')

    }
  }

  async store(req, res) {
    try {
      const newMovie = await movieService.store(req.actualUser, req.data);
      return BaseController.handleResponse(res, newMovie)
    } catch (e) {
      return BaseController.handleError(res, 'error while storing a movie')

    }
  }

  async delete(req, res) {
    try {
      const deletedMovie = await movieService.deleteMovie(req.filter, req.actualUser);
      return BaseController.handleResponse(res, deletedMovie)
    } catch (e) {
      return BaseController.handleError(res, 'error while deleting a movie')
    }
  }

  async update(req, res) {
    try {
      const updatedMovie = await movieService.update(req.filter, req.data, req.actualUser);
      return BaseController.handleResponse(res, updatedMovie)
    } catch (e) {
      return BaseController.handleError(res, 'error while updating a movie')
    }
  }
}

export default new MovieController();
