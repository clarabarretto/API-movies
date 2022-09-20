import * as yup from 'yup';

const schema = {
  store: {
    body: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }).noUnknown(),
  },
};

export default schema;
