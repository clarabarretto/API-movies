import movieService from '../services/movieService';
import BaseController from './BaseController';

class MovieController {
  async index(req, res) {
    try {
      const movies = await movieService.index(req.actualUser);
      return BaseController.handleResponse(res, movies)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')
    }
  }

  async show(req, res) {
    try {
      const { id } = req.filter;
      const movie = await movieService.show(id, req.actualUser);
      return BaseController.handleResponse(res, movie)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')

    }
  }

  async store(req, res) {
    try {
      const newMovie = await movieService.store(req.actualUser, req.data);
      return BaseController.handleResponse(res, newMovie)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')

    }
  }

  async delete(req, res) {
    try {
      const deletedMovie = await movieService.deleteMovie(req.filter, req.actualUser);
      return BaseController.handleResponse(res, deletedMovie)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')
    }
  }

  async update(req, res) {
    try {
      const updatedMovie = await movieService.update(req.filter, req.data, req.actualUser);
      return BaseController.handleResponse(res, updatedMovie)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')
    }
  }
}

export default new MovieController();
