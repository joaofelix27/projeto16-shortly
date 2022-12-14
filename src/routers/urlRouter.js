import { Router } from "express";
import { deleteUrlById, getMineShortenUrl, getUrlByShortenUrl, getUrlsById, urlsPost } from "../controllers/urlControllers.js";
import validateSchema from "../middlewares/genericSchemaMiddleware.js";
import validateUser from "../middlewares/validateUserMiddleware.js";

const urlRouter=Router()

urlRouter.post("/urls/shorten",validateSchema,validateUser,urlsPost)
urlRouter.get("/urls/:id",getUrlsById)
urlRouter.get("/urls/open/:shortUrl",getUrlByShortenUrl)
urlRouter.get("/users/me",validateUser,getMineShortenUrl)
urlRouter.delete("/urls/:id",validateUser,deleteUrlById)

export default urlRouter