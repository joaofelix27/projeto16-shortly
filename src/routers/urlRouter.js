import { Router } from "express";
import { deleteUrlById, getMineShortenUrl, getUrlByShortenUrl, getUrlsById, urlsPost } from "../controllers/urlControllers.js";
import validateUrl from "../middlewares/urlSchemaMiddleware.js";
import validateUser from "../middlewares/validateUserMiddleware.js";

const urlRouter=Router()

urlRouter.post("/urls/shorten",validateUrl,validateUser,urlsPost)
urlRouter.get("/urls/:id",getUrlsById)
urlRouter.get("/urls/open/:shortUrl",getUrlByShortenUrl)
urlRouter.get("/users/me",validateUser,getMineShortenUrl)
urlRouter.delete("/urls/:id",validateUser,deleteUrlById)

export default urlRouter