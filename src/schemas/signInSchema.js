import joi from "joi";

const signInSchema = joi.object({
  // .pattern(/^[a-zA-Z\s]*$/)
  email: joi.string().email().required(),
  password: joi.string().min(3).max(15).required(),
})

export default signInSchema;
