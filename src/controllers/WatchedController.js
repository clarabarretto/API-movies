import watchedService from '../services/watchedService';

class WatchedController {
  async index(req, res) {
    const movies = await watchedService.index(req.actualUser);
    res.json(movies);
  }

  async show(req, res) {
    try {
      const movie = await watchedService.show(req.actualUser);
      return res.json(movie);
    } catch (e) {
      return res.status(500).json({ error: e.message });
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
      const deletedMovie = await watchedService.deleteWatched(req.filter, req.actualUser);

      return res.json(deletedMovie);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });
    }
  }

  async update(req, res) {
    try {
      const updatedMovie = await watchedService.update(req.filter, req.data, req.actualUser);
      return res.json(updatedMovie);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new WatchedController();
