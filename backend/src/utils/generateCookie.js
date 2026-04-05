import jwt from "jsonwebtoken"

export default function generateCookie(user, res, customMaxAge) {
    const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )
    
        res.cookie("session_token", token, {
            httpOnly: true,
            domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : ".localhost",
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: customMaxAge || 60 * 60 * 60 * 60,
        })
}