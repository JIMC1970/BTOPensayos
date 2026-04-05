import express from "express"
import { getAllTemplates, createTemplate, getTemplateById, patchTemplateById, deleteTemplateById } from "../controllers/templates.controller.js"

const router = express.Router()

router.get("/", getAllTemplates)
router.post("/", createTemplate)
router.get("/:id", getTemplateById)
router.patch("/:id", patchTemplateById)
router.delete("/:id", deleteTemplateById)

export default router