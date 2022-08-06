import { Router } from "express";
import { getMyRanking } from "../controllers/rankingControllers.js";

const rankingRouter=Router()

rankingRouter.get("/ranking",getMyRanking)

export default rankingRouter