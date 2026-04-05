import express from "express"
import multer from "multer"
import { generateVideo } from "../controllers/ffmpeg.controller.js"

const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})

router.post("/generate-video", upload.single("audio"), generateVideo)

export default router