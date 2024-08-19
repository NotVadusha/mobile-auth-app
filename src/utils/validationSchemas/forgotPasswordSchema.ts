import * as yup from 'yup';

export const forgotPasswordSchema = yup
  .object({
    Email: yup.string().email().required(),
  })
  .required();
