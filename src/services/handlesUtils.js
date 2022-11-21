class handleUtils {

  handleCreate = (model, value) => {
    try {
      return model.create({ ...value });
    } catch (err) {
      throw new Error({ "Falha na Criação": err });
    }
  };
}

module.exports = new handleUtils();
