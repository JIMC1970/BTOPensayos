import express from "express"
import multer from "multer"
import { getEmotionalStateFiles, uploadMedia } from "../controllers/media.conroller.js"

const router = express.Router()
const upload = multer({dest:"uploads/"})

router.post("/upload", upload.single("file") ,uploadMedia)
router.get("/emotional-state/:folder" ,getEmotionalStateFiles)

export default router;