import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  dbAdminGetArticle,
  dbAdminUpdateArticle,
  dbAdminDeleteArticle,
  dbAdminUniqueSlug,
} from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  try {
    const item = await dbAdminGetArticle(id);
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
  let body: Partial<NewsArticle>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const existing = await dbAdminGetArticle(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    let slug: string | undefined;
    if (body.slug && body.slug !== existing.slug) {
      slug = await dbAdminUniqueSlug("news", slugify(body.slug), id);
    } else if (body.title && body.title !== existing.title && !body.slug) {
      slug = await dbAdminUniqueSlug("news", slugify(body.title), id);
    }

    const patch: Partial<NewsArticle> = {
      ...body,
      ...(slug ? { slug } : {}),
      readMinutes:
        body.readMinutes !== undefined ? Number(body.readMinutes) : undefined,
    };
    delete (patch as Record<string, unknown>).id;
    for (const k of Object.keys(patch)) {
      if ((patch as Record<string, unknown>)[k] === undefined) {
        delete (patch as Record<string, unknown>)[k];
      }
    }

    const updated = await dbAdminUpdateArticle(id, patch);
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
    await dbAdminDeleteArticle(id);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
