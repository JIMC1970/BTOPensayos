import express from "express"
import { postShortText } from "../controllers/speechgen.controller.js";

const router = express.Router();

router.post("/tts", postShortText)

export default router;