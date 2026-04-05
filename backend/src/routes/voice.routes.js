import express from "express"
import { createVoice, deleteVoice, getAllDistinctVoiceNames, getAllVoices, getVoiceFromNameAndGender, updateVoice } from "../controllers/voices.controller.js"

const router = express.Router()

router.get("/", getAllVoices)
router.get("/distinct-names", getAllDistinctVoiceNames)
router.post("/name-gender", getVoiceFromNameAndGender)
router.post("/", createVoice)
router.patch("/:id", updateVoice)
router.delete("/:id", deleteVoice)

export default router;