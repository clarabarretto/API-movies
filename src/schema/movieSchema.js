import * as yup from 'yup';

const schema = {
  store: {
    body: yup.object().shape({
      name: yup.string().required(),
      director: yup.string().required(),
      genre: yup.string().required(),
      time: yup.number().positive().required(),
      synopsis: yup.string().required(),

    }).noUnknown(),
  },
  update: {
    body: yup.object().shape({
      name: yup.string(),
      director: yup.string(),
      genre: yup.string(),
      time: yup.number().positive(),
      synopsis: yup.string(),

    }).noUnknown(),
    params: yup.object().shape({
      id: yup.number().integer().positive(),
    }).noUnknown(),
  },
  search: {
    params: yup.object().shape({
      id: yup.number().integer().positive(),
    }).noUnknown(),
  },

};

export default schema;
