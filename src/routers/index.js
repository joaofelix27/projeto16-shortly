import { Router } from "express";
import authRouter from "./authRouter.js";
import rankingRouter from "./rankingRouter.js";
import urlRouter from "./urlRouter.js";


const router=Router();

router.use(authRouter);
router.use(urlRouter)
router.use(rankingRouter)

export default router;