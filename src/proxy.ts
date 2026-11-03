import { NextResponse, type NextRequest } from "next/server";
import { locales, pickLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocalePrefix) return;

  const locale = pickLocale(request.headers.get("accept-language"));
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (favicon, images…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
