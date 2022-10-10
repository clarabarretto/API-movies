export default class BaseController {

  handleResponse(res, data) {
    return res.json(data);
  }

  handleError(res, error){
    return res.status(500).json({ error: error.message })
  }
};

