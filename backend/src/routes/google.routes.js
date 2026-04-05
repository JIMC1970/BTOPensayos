import express from "express"
import { postTTS } from "../controllers/google.controller.js";

const router = express.Router();
router.post("/tts", postTTS);

export default router;