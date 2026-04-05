import jwt from "jsonwebtoken"

export default function verifyToken(req, res, next) {
    const token = req.cookies.session_token;

    if (!token) {
        return res.status(401).json({ error: "No hay token, acceso denegado"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user =  decoded
        next()
    } catch (error) {
        return res.status(401).json( error, details = "Token inválido o expirado" )
    }
}