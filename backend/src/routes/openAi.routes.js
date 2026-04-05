import express from "express"
import { chatOpenAi } from "../controllers/openAi.controller.js";

const router = express.Router();
router.post("/chat", chatOpenAi);

export default router;