import signUpSchema from "../schemas/signUpSchema.js";

function validateSignUp (req,res,next) {

    const { error } = signUpSchema.validate(req.body,{ abortEarly: false});
    
    if (error) {
        return res.status(422).send(error)
    }

    next ()
}

export default validateSignUp;