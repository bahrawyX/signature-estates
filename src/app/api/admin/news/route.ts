import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readAll, createOne, generateId, uniqueSlug } from "@/lib/data-store";
import { slugify } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const items = readAll("news");
  return NextResponse.json({ items });
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

  const id = generateId("news");
  const baseSlug = body.slug ? slugify(body.slug) : slugify(body.title);
  const slug = uniqueSlug("news", baseSlug);

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

  createOne("news", newItem);
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);

  return NextResponse.json({ item: newItem }, { status: 201 });
}
