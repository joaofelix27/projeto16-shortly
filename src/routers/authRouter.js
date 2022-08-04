import { Router } from "express";
import { signUp,signIn } from "../controllers/authControllers.js";
import validateSignIn from "../middlewares/signInSchemaMiddleware.js";
import validateSignUp from "../middlewares/signUpSchemaMiddleware.js";


const authRouter=Router()

authRouter.post("/signUp",validateSignUp,signUp)

authRouter.post("/signIn",validateSignIn,signIn)

export default authRouter