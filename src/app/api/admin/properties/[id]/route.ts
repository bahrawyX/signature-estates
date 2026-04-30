import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  readOne,
  updateOne,
  deleteOne,
  uniqueSlug,
} from "@/lib/data-store";
import { slugify } from "@/lib/utils";
import type { Property } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const item = readOne("properties", id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  let body: Partial<Property>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const existing = readOne("properties", id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // If slug or name changed, recompute and dedupe.
  let slug = existing.slug;
  if (body.slug && body.slug !== existing.slug) {
    slug = uniqueSlug("properties", slugify(body.slug), id);
  } else if (body.name && body.name !== existing.name && !body.slug) {
    // Only auto-rebuild slug from name if user didn't supply one.
    slug = uniqueSlug("properties", slugify(body.name), id);
  }

  const patch: Partial<Property> = {
    ...body,
    slug,
    bedrooms: body.bedrooms !== undefined ? Number(body.bedrooms) : existing.bedrooms,
    bathrooms: body.bathrooms !== undefined ? Number(body.bathrooms) : existing.bathrooms,
    areaSqm: body.areaSqm !== undefined ? Number(body.areaSqm) : existing.areaSqm,
    floor:
      body.floor !== undefined && body.floor !== null
        ? Number(body.floor)
        : body.floor === null
        ? undefined
        : existing.floor,
    priceEGP: body.priceEGP !== undefined ? Number(body.priceEGP) : existing.priceEGP,
    deliveryYear:
      body.deliveryYear !== undefined && body.deliveryYear !== null
        ? Number(body.deliveryYear)
        : body.deliveryYear === null
        ? undefined
        : existing.deliveryYear,
    featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
  };
  // Never allow id mutation.
  delete (patch as Record<string, unknown>).id;

  const updated = updateOne("properties", id, patch);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath(`/properties/${existing.slug}`);
  if (updated.slug !== existing.slug) revalidatePath(`/properties/${updated.slug}`);

  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const existing = readOne("properties", id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const ok = deleteOne("properties", id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath(`/properties/${existing.slug}`);

  return NextResponse.json({ ok: true });
}
