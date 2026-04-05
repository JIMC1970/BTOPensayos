import { NextRequest, NextResponse } from "next/server";
import verifyJWT from "./utils/verifyJWT";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const token = req.cookies.get("session_token")?.value
    const user = token ? await verifyJWT(token) : null;
    const protectedRoutes = ["/admin/dashboard"]

    const isProtected = protectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    )

    if (isProtected && !user) {
      return NextResponse.redirect(new URL("/login", req.url))
    } else if(isProtected && user?.role !== "admin"){
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
    res.cookies.set("user", JSON.stringify(user), { path: "/" });
  
    return res
}

export const config = {
  matcher: ["/home","/profile/:path*", "/admin/:path*"],
};