import { Router } from "express";
import { signUp } from "../controllers/authControllers.js";
import validateSignUp from "../middlewares/signUpSchemaMiddleware.js";


const authRouter=Router()

authRouter.post("/signUp",validateSignUp,signUp)

authRouter.post("/signIn",)

export default authRouter;