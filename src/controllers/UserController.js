import userService from '../services/userService';

class UserController {
  async index(req, res) {
    try {
      const users = await userService.index(req.actualUser.admin);

      return res.json(users);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async show(req, res) {
    try {
      const user = await userService.show(req.actualUser);
      return res.json(user);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async store(req, res) {
    try {
      const newUser = await userService.store(req.data);
      return res.json(newUser);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await userService.deleteUser(req.actualUser, req.filter);
      return res.json(user);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async update(req, res) {
    try {
      const updatedUser = await userService.update(req.actualUser, req.data);

      return res.json(updatedUser);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default new UserController();
