import { Router } from "express";
import postGeneration from "../controllers/generate/postGenteration";

const router = Router("/generate");

router.post("/", postGeneration);

export default router;