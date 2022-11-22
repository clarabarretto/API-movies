import * as yup from 'yup';

const schema = {
  recovery: {
    body: yup.object({
      email: yup.string().email().required(),
    }).noUnknown(),
  },

  token: {
    params: yup.object({
      token: yup.string().required(),
    }).noUnknown(),
  },

  change: {
    body: yup.object({
      password: yup.string().required('Please enter your password.').min(3, 'The password field must contain at least 3 characters!'),
      confirm_password: yup.string().required('Please retype your password.').oneOf([yup.ref('password')], 'Your passwords do not match.'),
    }).noUnknown(),

    params: yup.object({
      token: yup.string().length(40).required(),
    }).noUnknown(),
  },
};

export default schema;
