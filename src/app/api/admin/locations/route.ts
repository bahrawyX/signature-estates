import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readAll, createOne } from "@/lib/data-store";
import { slugify } from "@/lib/utils";
import type { Location } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const items = readAll("locations");
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  let body: Partial<Location>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.region) {
    return NextResponse.json(
      { error: "Missing required fields: name, region" },
      { status: 400 },
    );
  }

  // Locations use a slug-style id (e.g. "new-cairo"). Ensure uniqueness.
  const all = readAll("locations");
  const taken = new Set(all.map((l) => l.id));
  const baseId = slugify(body.name);
  let id = baseId;
  let i = 2;
  while (taken.has(id)) id = `${baseId}-${i++}`;

  const newItem: Location = {
    id,
    name: body.name,
    arabicName: body.arabicName ?? undefined,
    region: body.region,
    description: body.description ?? "",
    image: body.image ?? "",
  };

  createOne("locations", newItem);
  revalidatePath("/");
  revalidatePath("/properties");

  return NextResponse.json({ item: newItem }, { status: 201 });
}
