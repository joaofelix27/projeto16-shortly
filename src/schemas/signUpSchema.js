import joi from "joi";

const signUpSchema = joi.object({
  // .pattern(/^[a-zA-Z\s]*$/)
  name: joi
    .string()
    .required(), // Only accepts upper or lower case letters or blank spaces

  email: joi.string().email().required(),
  password: joi.string().min(3).max(15).required(),
  confirmPassword: joi
    .any()
    .valid(joi.ref("password"))
    .required(),
});

export default signUpSchema;
