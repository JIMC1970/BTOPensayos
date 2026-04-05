import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import templatesRoutes from "./routes/templates.routes.js";
import shortsRoutes from "./routes/shorts.routes.js";
import ffmpegRoutes from "./routes/ffmpeg.routes.js";
import openAiRoutes from "./routes/openAi.routes.js";
import googleRoutes from "./routes/google.routes.js";
import voiceRoutes from "./routes/voice.routes.js";
import speechgenRoutes from "./routes/speechgen.routes.js";
import verifyToken from "./middleware/verifyToken.js";
import isAdmin from "./middleware/isAdmin.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

console.log("Ruta del frontend", process.env.FRONTEND_URL);


if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1)
}

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", verifyToken, userRoutes)
app.use("/media", mediaRoutes)
app.use("/templates", templatesRoutes)
app.use("/shorts", shortsRoutes)
app.use("/admin", isAdmin, adminRoutes)
app.use("/openai", openAiRoutes)
app.use("/google", googleRoutes)
app.use("/ffmpeg", ffmpegRoutes)
app.use("/voices", voiceRoutes)
app.use("/speechgen", speechgenRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));