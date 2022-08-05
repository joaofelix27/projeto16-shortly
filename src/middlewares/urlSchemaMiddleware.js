import urlSchema from "../schemas/urlSchema.js";

function validateUrl (req,res,next) {

    const { error } = urlSchema.validate(req.body,{ abortEarly: false});
    
    if (error) {
        return res.status(422).send(error)
    }

    next ()
}

export default validateUrl;