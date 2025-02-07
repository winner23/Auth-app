import { EnumTokens } from "@/services/auth/auth-token.service";
import { NextRequest, NextResponse } from "next/server";
import { APP_URL, PUBLIC_URL } from "./lib/navigation.conf";

const protectedRoutes = [PUBLIC_URL.root("/")];

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  const token = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
  const isAuthPath = request.url.includes(PUBLIC_URL.auth());

  if (protectedRoutes.some((route) => request.url === APP_URL + route)) {
    if (token) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
    }
  }

  if (isAuthPath) {
    if (token) {
      return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.url));
    }
    return NextResponse.next();
  }

  if (token && !isAuthPath) {
    if (validateToken(token)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
    }
  }

  return NextResponse.next();
}

function validateToken(token: string) {
  const payload = token.split(".")[1];
  const expired = JSON.parse(atob(payload)).exp;
  return Date.now() < expired * 1000;
}
