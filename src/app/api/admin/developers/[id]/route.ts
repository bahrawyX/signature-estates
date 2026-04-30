import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  dbAdminGetDeveloper,
  dbAdminUpdateDeveloper,
  dbAdminDeleteDeveloper,
} from "@/lib/db";
import type { Developer } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  try {
    const item = await dbAdminGetDeveloper(id);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ item });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  let body: Partial<Developer>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const patch: Partial<Developer> = {
      ...body,
      established:
        body.established !== undefined ? Number(body.established) : undefined,
    };
    if (patch.established === undefined) delete patch.established;
    delete (patch as Record<string, unknown>).id;
    const updated = await dbAdminUpdateDeveloper(id, patch);
    revalidatePath("/", "layout");
    return NextResponse.json({ item: updated });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  try {
    await dbAdminDeleteDeveloper(id);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
