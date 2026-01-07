// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt, DecryptedSession } from "./lib/session";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get("accessTokenn")?.value;

  let session: DecryptedSession | null = null;

  if (token) {
    try {
      session = await decrypt(token);
    } catch (error) {
      console.error("Invalid or expired token:", error);
      const response = NextResponse.redirect(
        new URL(`/auth/signin${search}`, req.url)
      );
      response.cookies.delete("accessToken");
      return response;
    }
  }

  const isLoggedIn = !!session?.userId;

  if (isLoggedIn && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isAuthRoute = pathname.startsWith("/auth");
  const isPublicRoute = pathname === "/" || pathname.startsWith("/public");

  if (!isLoggedIn && !isAuthRoute && !isPublicRoute) {
    const redirectTo = encodeURIComponent(pathname + search);
    const loginUrl = new URL(`/auth/signin?redirect=${redirectTo}`, req.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("accessToken");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"],
  // "/dashboard/:path*",
};
