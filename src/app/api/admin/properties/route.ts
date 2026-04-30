import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  dbAdminGetAllProperties,
  dbAdminCreateProperty,
  dbAdminGenerateId,
  dbAdminUniqueSlug,
} from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { Property } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const items = await dbAdminGetAllProperties();
    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  let body: Partial<Property>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.type || !body.status) {
    return NextResponse.json(
      { error: "Missing required fields: name, type, status" },
      { status: 400 },
    );
  }

  try {
    const id = await dbAdminGenerateId("properties");
    const baseSlug = body.slug ? slugify(body.slug) : slugify(body.name);
    const slug = await dbAdminUniqueSlug("properties", baseSlug);

    const newItem: Property = {
      id,
      slug,
      name: body.name,
      type: body.type,
      status: body.status,
      locationId: body.locationId ?? "",
      developerId: body.developerId ?? "",
      bedrooms: Number(body.bedrooms ?? 0),
      bathrooms: Number(body.bathrooms ?? 0),
      areaSqm: Number(body.areaSqm ?? 0),
      floor:
        body.floor !== undefined && body.floor !== null
          ? Number(body.floor)
          : undefined,
      priceEGP: Number(body.priceEGP ?? 0),
      deliveryYear:
        body.deliveryYear !== undefined && body.deliveryYear !== null
          ? Number(body.deliveryYear)
          : undefined,
      featured: Boolean(body.featured),
      description: body.description ?? "",
      amenities: Array.isArray(body.amenities) ? body.amenities : [],
      images: Array.isArray(body.images) ? body.images : [],
      mapUrl: body.mapUrl ?? "",
    };

    const created = await dbAdminCreateProperty(newItem);
    revalidatePath("/", "layout");
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
