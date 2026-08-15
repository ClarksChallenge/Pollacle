import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // LOCKED DURING CLOSED TESTING
  // Nobody should be able to access the login or Google sign-in flow.
  if (
    pathname === "/login" ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Lock creator/founder areas as well.
  const lockedPaths = [
    "/dashboard",
    "/founder",
    "/admin",
    "/edit",
  ];

  const isLocked = lockedPaths.some(
    (path) =>
      pathname === path ||
      pathname.startsWith(`${path}/`)
  );

  if (isLocked) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Block development impersonation.
  if (pathname.startsWith("/api/dev/impersonate")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/api/auth/:path*",
    "/dashboard/:path*",
    "/founder/:path*",
    "/admin/:path*",
    "/edit/:path*",
    "/api/dev/impersonate/:path*",
  ],
};
