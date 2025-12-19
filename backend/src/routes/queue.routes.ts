import { Router } from "express";
import { addToken, getQueue, callNext } from "../controllers/queue.controller";

const router = Router();

router.post("/", addToken);      
router.get("/", getQueue);       
router.post("/next", callNext);  


export default router;