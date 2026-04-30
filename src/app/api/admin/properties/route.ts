import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  readAll,
  createOne,
  generateId,
  uniqueSlug,
} from "@/lib/data-store";
import { slugify } from "@/lib/utils";
import type { Property } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const items = readAll("properties");
  return NextResponse.json({ items });
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

  const id = generateId("properties");
  const baseSlug = body.slug ? slugify(body.slug) : slugify(body.name);
  const slug = uniqueSlug("properties", baseSlug);

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
    floor: body.floor !== undefined && body.floor !== null ? Number(body.floor) : undefined,
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

  createOne("properties", newItem);
  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath(`/properties/${slug}`);

  return NextResponse.json({ item: newItem }, { status: 201 });
}
