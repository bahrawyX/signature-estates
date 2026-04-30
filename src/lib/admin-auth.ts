// Lightweight HMAC-based session helpers for the admin panel.
// No JWT, no DB — the cookie value itself is `<expiresAt>.<hmac>` and we
// re-validate the HMAC on every request.

import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "se_admin_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "dev-fallback-secret-change-in-production-please"
  );
}

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || "Estates2024!";
}

/** Constant-time string comparison to prevent timing attacks. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Verify a submitted password against the env value. */
export function verifyPassword(submitted: string): boolean {
  if (!submitted) return false;
  return safeEqual(submitted, getPassword());
}

/** Create a signed session token of the form `<expiresAt>.<hmac>`. */
export function createToken(): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = String(expiresAt);
  const hmac = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${hmac}`;
}

/** Validate a session token. Returns true only if signature matches and not expired. */
export function verifyToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, hmac] = parts;
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  if (!safeEqual(hmac, expected)) return false;
  const expiresAt = parseInt(payload, 10);
  if (!Number.isFinite(expiresAt)) return false;
  return Date.now() < expiresAt;
}

/** Read the session cookie and verify it (server components / route handlers). */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}

/** Cookie attributes used for set / clear. */
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 24, // 24 hours, in seconds
};
