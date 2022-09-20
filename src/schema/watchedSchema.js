import * as yup from 'yup';

const schema = {
  store: {
    body: yup.object().shape({
      movie_id: yup.number().required(),
      rating: yup.number(),
    }).noUnknown(),
  },
  update: {
    body: yup.object().shape({
      rating: yup.number(),
    }).noUnknown(),
    params: yup.object().shape({
      user_id: yup.number().positive(),
    }).noUnknown(),
  },
  search: {
    params: yup.object().shape({
      id: yup.number().positive(),
    }).noUnknown(),
  },
  show: {
    params: yup.object().shape({
      user_id: yup.number().positive(),
    }).noUnknown(),
  },

};

export default schema;
