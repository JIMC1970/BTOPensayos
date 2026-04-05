import jwt from "jsonwebtoken"

export default  function isAdmin(req, res, next) {
    const token = req.cookies.session_token;
    if(!token) return res.status(401).json({error: "Token faltante"})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if (decoded.role !== "admin") return res.status(403).json({error: "No autorizado"})
        
        req.user = decoded
        next();
    } catch (error) {
        res.status(401).json({error, details: "Token invalido"})
    }
}