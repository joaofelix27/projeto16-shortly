import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";
import urlSchema from "../schemas/urlSchema.js";


function validateSchema (req,res,next) {
    let error = undefined
    if(req?.path=="/signUp"){
    error = signUpSchema.validate(req.body,{ abortEarly: false}).error;
    console.log(error)
    } else if(req?.path==="/signIn"){
    error= signInSchema.validate(req.body,{ abortEarly: false}).error;
    } else {
    error= urlSchema.validate(req.body,{ abortEarly: false}).error;
    }
    if (error) {
        return res.status(422).send(error)
    }
    next()
}

export default validateSchema;