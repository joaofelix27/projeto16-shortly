import { Router } from "express";
import { signUp,signIn } from "../controllers/authControllers.js";
import validateSchema from "../middlewares/genericSchemaMiddleware.js";


const authRouter=Router()

authRouter.post("/signUp",validateSchema,signUp)

authRouter.post("/signIn",validateSchema,signIn)

export default authRouter