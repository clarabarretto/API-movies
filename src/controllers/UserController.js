import userService from '../services/userService';
import BaseController from './BaseController';

class UserController extends BaseController  {
  async index(req, res) {
    try {
      const users = await userService.index(req.actualUser.admin);
      return BaseController.handleResponse(res, users)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')

    }
  }

  async show(req, res) {
    try {
      const user = await userService.show(req.actualUser);
      return BaseController.handleResponse(res, user)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')

    }
  }

  async store(req, res) {
    try {
      const newUser = await userService.store(req.data);
      return BaseController.handleResponse(res, newUser)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')

    }
  }

  async delete(req, res) {
    try {
      const user = await userService.deleteUser(req.actualUser, req.filter);
      return BaseController.handleResponse(res, user)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')

    }
  }

  async update(req, res) {
    try {
      const updatedUser = await userService.update(req.actualUser, req.data);
      return BaseController.handleResponse(res, updatedUser)
    } catch (e) {
      return BaseController.handleError(res, 'ERROR')

    }
  }
}

export default new UserController();
