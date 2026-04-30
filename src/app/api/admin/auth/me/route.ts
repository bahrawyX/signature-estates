import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const ok = await isAuthenticated();
  return NextResponse.json({ authenticated: ok });
}
