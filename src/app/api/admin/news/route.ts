import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  dbAdminGetAllArticles,
  dbAdminCreateArticle,
  dbAdminGenerateId,
  dbAdminUniqueSlug,
} from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const items = await dbAdminGetAllArticles();
    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  let body: Partial<NewsArticle>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.title || !body.category || !body.author) {
    return NextResponse.json(
      { error: "Missing required fields: title, category, author" },
      { status: 400 },
    );
  }

  try {
    const id = await dbAdminGenerateId("news");
    const baseSlug = body.slug ? slugify(body.slug) : slugify(body.title);
    const slug = await dbAdminUniqueSlug("news", baseSlug);

    const newItem: NewsArticle = {
      id,
      slug,
      title: body.title,
      excerpt: body.excerpt ?? "",
      body: Array.isArray(body.body) ? body.body : [],
      category: body.category,
      author: body.author,
      publishedAt: body.publishedAt ?? new Date().toISOString().slice(0, 10),
      readMinutes: Number(body.readMinutes ?? 3),
      cover: body.cover ?? "",
    };

    const created = await dbAdminCreateArticle(newItem);
    revalidatePath("/", "layout");
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
