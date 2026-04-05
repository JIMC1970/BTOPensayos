import { UserToken } from "@/lib/types"
import { jwtVerify } from "jose"

export default async function verifyJWT(token: string){
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const {payload} = await jwtVerify(token, secret)
        return payload as UserToken
    } catch(_error){
        return null
    }
}