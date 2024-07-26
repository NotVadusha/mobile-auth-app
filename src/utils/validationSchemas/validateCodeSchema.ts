import * as yup from "yup";

export const validateCodeSchema = yup
  .object({
    Code: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
  })
  .required();
