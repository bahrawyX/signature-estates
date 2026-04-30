// Edge-runtime middleware that protects /admin pages and /api/admin routes.
// Uses Web Crypto (SubtleCrypto) since Node's `crypto` is not available in Edge.

import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "se_admin_session";

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "dev-fallback-secret-change-in-production-please"
  );
}

async function verifyTokenEdge(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sigHex] = parts;

  const expiresAt = parseInt(payload, 10);
  if (!Number.isFinite(expiresAt) || Date.now() >= expiresAt) return false;

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(getSecret()),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const sig = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(payload),
    );
    const expected = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    // Length check first; constant-time-ish comparison for the rest.
    if (expected.length !== sigHex.length) return false;
    let mismatch = 0;
    for (let i = 0; i < expected.length; i++) {
      mismatch |= expected.charCodeAt(i) ^ sigHex.charCodeAt(i);
    }
    return mismatch === 0;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const ok = await verifyTokenEdge(token);

  // ── Page protection ──
  if (pathname.startsWith("/admin")) {
    // /admin/login is always accessible
    if (pathname === "/admin/login") {
      // Already authenticated? Redirect to dashboard.
      if (ok) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ── API protection ──
  if (pathname.startsWith("/api/admin")) {
    // Auth endpoints are exempt — the routes themselves handle credentials.
    if (
      pathname === "/api/admin/auth/login" ||
      pathname === "/api/admin/auth/logout" ||
      pathname === "/api/admin/auth/me"
    ) {
      return NextResponse.next();
    }
    if (!ok) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
