import * as yup from 'yup'

const schema = {
  store: {
    file: yup.object().shape({
      fieldname: yup.string().required(),
      originalname: yup.string().required(),
      encoding: yup.string().required(),
      mimetype: yup.string().oneOf(['image/png', 'image/jpeg']).required(),
      destination: yup.string().required(),
      filename: yup.string().required(),
      path: yup.string().required(),
      size: yup.number().integer().positive().max(1024 * 1024, 'file is too big').required('there is no file to be posted')
    }).required().noUnknown(),
    params: yup.object().shape({
      movie_id: yup.number().integer().positive().required(),
    }).noUnknown(),
  },
  search: {
    params: yup.object().shape({
      user_id: yup.number().integer().positive(),
    }).noUnknown(),
  },
}
export default schema
