export default {
  handleResponse: (res, data) => res.json(data),

  handleError: (res, error) => res.status(401).json({ error: error.message }),
};

