import { JWTPayload, SignJWT } from "jose";

export default async function generateJWT(payload:JWTPayload){
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    return await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setExpirationTime("1h")
        .sign(secret);
}

