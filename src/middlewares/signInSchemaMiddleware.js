import signInSchema from "../schemas/signInSchema.js";


function validateSignIn (req,res,next) {

    const { error } = signInSchema.validate(req.body,{ abortEarly: false});
    
    if (error) {
        return res.status(422).send(error)
    }

    next ()
}

export default validateSignIn;