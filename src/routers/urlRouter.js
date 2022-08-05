import { Router } from "express";
import { urlsPost } from "../controllers/urlControllers.js";
import validateUrl from "../middlewares/urlSchemaMiddleware.js";
import validateUser from "../middlewares/validateUserMiddleware.js";

const urlRouter=Router()

urlRouter.post("/urls/shorten",validateUrl,validateUser,urlsPost)

export default urlRouter