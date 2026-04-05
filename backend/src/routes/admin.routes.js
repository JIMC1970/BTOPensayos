import express from "express"
import { getEmotionalStatesFolders, updateUserRole } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", (req, res) => {res.json({success: true})})
router.get("/emotional-states", getEmotionalStatesFolders)
router.post("/update-user-role", updateUserRole)

export default router;