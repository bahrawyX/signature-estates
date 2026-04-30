import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  dbAdminGetProperty,
  dbAdminUpdateProperty,
  dbAdminDeleteProperty,
  dbAdminUniqueSlug,
} from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { Property } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  try {
    const item = await dbAdminGetProperty(id);
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
  let body: Partial<Property>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const existing = await dbAdminGetProperty(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Slug regeneration if changed
    let slug: string | undefined;
    if (body.slug && body.slug !== existing.slug) {
      slug = await dbAdminUniqueSlug("properties", slugify(body.slug), id);
    } else if (body.name && body.name !== existing.name && !body.slug) {
      slug = await dbAdminUniqueSlug("properties", slugify(body.name), id);
    }

    const patch: Partial<Property> = {
      ...body,
      ...(slug ? { slug } : {}),
      bedrooms: body.bedrooms !== undefined ? Number(body.bedrooms) : undefined,
      bathrooms: body.bathrooms !== undefined ? Number(body.bathrooms) : undefined,
      areaSqm: body.areaSqm !== undefined ? Number(body.areaSqm) : undefined,
      floor:
        body.floor !== undefined && body.floor !== null
          ? Number(body.floor)
          : undefined,
      priceEGP: body.priceEGP !== undefined ? Number(body.priceEGP) : undefined,
      deliveryYear:
        body.deliveryYear !== undefined && body.deliveryYear !== null
          ? Number(body.deliveryYear)
          : undefined,
      featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
    };
    delete (patch as Record<string, unknown>).id;
    // Drop undefined keys so we don't overwrite columns with NULL.
    for (const k of Object.keys(patch)) {
      if ((patch as Record<string, unknown>)[k] === undefined) {
        delete (patch as Record<string, unknown>)[k];
      }
    }

    const updated = await dbAdminUpdateProperty(id, patch);
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
    await dbAdminDeleteProperty(id);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
