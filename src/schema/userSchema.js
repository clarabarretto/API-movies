import * as yup from 'yup';

const schema = {
  store: {
    body: yup.object().shape({
      admin: yup.boolean().default(false),
      username: yup.string().required('username is required').min(3).max(50),
      email: yup.string().email().required(),
      password: yup.string().required(),
      confirmPassword: yup.string(255)
        .required()
        .oneOf([yup.ref('password'), null], 'password is not the same'),
    }).noUnknown(),
  },
  update: {
    body: yup.object().shape({
      username: yup.string().min(3).max(50),
      email: yup.string().email(),
    }).noUnknown(),
  },
  delete: {
    params: yup.object().shape({
      id: yup.number().integer().positive(),
    }).noUnknown(),
  },
};

export default schema;
