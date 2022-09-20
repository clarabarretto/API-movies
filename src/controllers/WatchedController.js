import watchedService from '../services/watchedService';

class WatchedController {
  async index(req, res) {
    const movies = await watchedService.index(req.actualUser);
    res.json(movies);
  }

  async show(req, res) {
    try {
      const { id } = req.filter;
      const movie = await watchedService.show(id, req.actualUser);
      return res.json(movie);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const newMovie = await watchedService.store(req.actualUser, req.data);
      return res.json(newMovie);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedMovie = await watchedService.deleteMovie(req.filter, req.actualUser);
      return res.json(deletedMovie);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async update(req, res) {
    try {
      const updatedMovie = await watchedService.update(req.filter, req.data, req.actualUser);
      return res.json(updatedMovie);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new WatchedController();
