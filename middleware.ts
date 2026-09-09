import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Already logged in → redirect away from login page to dashboard
  if (pathname === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Not logged in → redirect to login for protected routes
  const isProtected =
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/admin/events") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/registrations");

  if (isProtected && !token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/login",
    "/admin/dashboard/:path*",
    "/admin/events/:path*",
    "/api/admin/:path*",
    "/api/registrations/:path*",
  ],
};
