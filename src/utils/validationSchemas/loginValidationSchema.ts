import * as yup from 'yup';

export const loginValidationSchema = yup
  .object({
    Email: yup.string().min(3).required(),
    Password: yup.string().min(8).required(),
  })
  .required();
