import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";
import { getErrorResponse } from "./lib/helpers";

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

let redirectToLogin = false;
export async function middleware(req: NextRequest) {
  let token: string | undefined;

  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  if (req.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin))
    return;

  if (
    (!token &&
      (req.nextUrl.pathname.startsWith("/api/students") ||
        req.nextUrl.pathname.startsWith("/api/auth/student/logout") ||
        req.nextUrl.pathname.startsWith("/api/cafes") ||
        req.nextUrl.pathname.startsWith("/api/auth/cafe/logout"))) ||
    req.nextUrl.pathname.startsWith("/api/riders") ||
    req.nextUrl.pathname.startsWith("/api/auth/rider/logout")
  ) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    );
  }

  const response = NextResponse.next();

  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      response.headers.set("X-USER-ID", sub);
      (req as AuthenticatedRequest).user = { id: sub };
    }
  } catch (error) {
    redirectToLogin = true;
    if (req.nextUrl.pathname.startsWith("/api")) {
      return getErrorResponse(401, "Token is invalid or user doesn't exists");
    }

    return NextResponse.redirect(
      new URL(`/login?${new URLSearchParams({ error: "badauth" })}`, req.url)
    );
  }

  const authUser = (req as AuthenticatedRequest).user;

  if (!authUser) {
    return NextResponse.redirect(
      new URL(
        `/login?${new URLSearchParams({
          error: "badauth",
          forceLogin: "true",
        })}`,
        req.url
      )
    );
  }

  if (req.url.includes("/login") && authUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/userStudent/cafe/:path*",
    "/userStudent/cart",
    "/userStudent/faq",
    "/userStudent/orders/:path*",
    "/userStudent/pay/:path*",
    "/userStudent/product/:path*",
    "/userStudent/profile/:path*",
    "/userStudent/success",
    "/userCafe/management/:path*",
    "/userCafe/order/:path*",
    "/userCafe/profile",
    "/userCafe/setting/",
    "/userRider/order/:path*",
    "/userRider/profile",
    "/userRider/setting",
    "/login",
    "/api/user/:path*",
    "/api/auth/student/logout",
    "/api/auth/cafe/logout",
    "/api/auth/rider/logout",
    "/",
    // "/product/:path*",
    // "/orders/:path*",
    // "/faq",
    // "/cart",
    // "/cafe/:path*",
    // "/foodiepassport",
  ],
};
