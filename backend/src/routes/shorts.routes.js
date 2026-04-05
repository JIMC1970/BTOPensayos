import express from "express"
import { getAllShorts, getShortById } from "../controllers/shorts.controller.js"

const router = express.Router()

router.get("/", getAllShorts)
router.get("/:id", getShortById)

export default router