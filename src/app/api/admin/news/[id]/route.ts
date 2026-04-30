import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readOne, updateOne, deleteOne, uniqueSlug } from "@/lib/data-store";
import { slugify } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const item = readOne("news", id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  let body: Partial<NewsArticle>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const existing = readOne("news", id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let slug = existing.slug;
  if (body.slug && body.slug !== existing.slug) {
    slug = uniqueSlug("news", slugify(body.slug), id);
  } else if (body.title && body.title !== existing.title && !body.slug) {
    slug = uniqueSlug("news", slugify(body.title), id);
  }

  const patch: Partial<NewsArticle> = {
    ...body,
    slug,
    readMinutes:
      body.readMinutes !== undefined ? Number(body.readMinutes) : existing.readMinutes,
  };
  delete (patch as Record<string, unknown>).id;

  const updated = updateOne("news", id, patch);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath(`/news/${existing.slug}`);
  if (updated.slug !== existing.slug) revalidatePath(`/news/${updated.slug}`);

  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const existing = readOne("news", id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const ok = deleteOne("news", id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath(`/news/${existing.slug}`);
  return NextResponse.json({ ok: true });
}
