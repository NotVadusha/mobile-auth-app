import * as yup from "yup";

export const registerValidationSchema = yup
  .object({
    Username: yup.string().min(3).required(),
    Email: yup.string().email().required(),
    Password: yup
      .string()
      .min(8)
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password should contain at least one uppercase and lowercase character",
      )
      .required(),
    RepeatedPassword: yup
      .string()
      .label("Confirm password")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password should contain at least one uppercase and lowercase character",
      )
      .required()
      .oneOf([yup.ref("Password")], "Passwords must match"),
  })
  .required();
