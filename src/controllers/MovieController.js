import movieService from '../services/movieService';
import BaseController from './BaseController';

class MovieController extends BaseController {
  constructor(){
    super()

    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
    this.store = this.store.bind(this)
    this.delete = this.delete.bind(this)
    this.update = this.update.bind(this)
  }

  async index(req, res) {
    try {
      const movies = await movieService.index(req.actualUser);
      this.handleResponse(res, movies)
    } catch (e) {
      this.handleError(res, 'error while listing all movies')
    }
  }

  async show(req, res) {
    try {
      const { id } = req.filter;
      const movie = await movieService.show(id, req.actualUser);
      this.handleResponse(res, movie)
    } catch (e) {
      this.handleError(res, 'error while getting a movie')

    }
  }

  async store(req, res) {
    try {
      const newMovie = await movieService.store(req.actualUser, req.data);
      this.handleResponse(res, newMovie)
    } catch (e) {
      this.handleError(res, 'error while storing a movie')
    }
  }

  async delete(req, res) {
    try {
      const deletedMovie = await movieService.deleteMovie(req.filter, req.actualUser);
      this.handleResponse(res, deletedMovie)
    } catch (e) {
      this.handleError(res, 'error while deleting a movie')
    }
  }

  async update(req, res) {
    try {
      const updatedMovie = await movieService.update(req.filter, req.data, req.actualUser);
      this.handleResponse(res, updatedMovie)
    } catch (e) {
      this.handleError(res, 'error while updating a movie')
    }
  }
}

export default new MovieController();
