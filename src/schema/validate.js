class SchemaValidator {
  validate(schema) {
    return async (req, res, next) => {
      console.log(req.body)
      const requestData = (req.body && Object.keys(req?.body).length || req?.file && Object.keys(req?.file).length)

      try {
        req.data = requestData
        ? (!schema.body ? await schema.file.validate(req.file) : await schema.body.validate(req.body)) : null

        req.filter = Object.keys(req.params).length
          ? await schema.params.validate(req.params) : null;

        req.filter = Object.keys(req.query).length ? {
          ...req.filter, ...(await schema.params.validate(req.query)),
        } : req.filter || null;

        return next();
      } catch (err) {
        return res.status(401).json({ error: err.message });
      }
    };

  }
}

export default SchemaValidator
