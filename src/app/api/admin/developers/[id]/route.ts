import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readOne, updateOne, deleteOne } from "@/lib/data-store";
import type { Developer } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const item = readOne("developers", id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
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
  const patch: Partial<Developer> = {
    ...body,
    established: body.established !== undefined ? Number(body.established) : undefined,
  };
  if (patch.established === undefined) delete patch.established;
  delete (patch as Record<string, unknown>).id;
  const updated = updateOne("developers", id, patch);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/");
  revalidatePath("/developers");
  revalidatePath("/properties");
  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const ok = deleteOne("developers", id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/");
  revalidatePath("/developers");
  revalidatePath("/properties");
  return NextResponse.json({ ok: true });
}
