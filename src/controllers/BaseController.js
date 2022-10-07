export default class BaseController {

  static handleResponse(res, data) {
    return res.json(data);
  }

  static handleError (res, error){
    return res.status(500).json({ error: error.message })
  }
};

