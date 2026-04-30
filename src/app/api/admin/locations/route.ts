import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  dbAdminGetAllLocations,
  dbAdminCreateLocation,
  dbAdminLocationIdTaken,
} from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { Location } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const items = await dbAdminGetAllLocations();
    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
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

  try {
    const baseId = slugify(body.name);
    let id = baseId;
    let i = 2;
    while (await dbAdminLocationIdTaken(id)) {
      id = `${baseId}-${i++}`;
      if (i > 100) break;
    }

    const newItem: Location = {
      id,
      name: body.name,
      arabicName: body.arabicName ?? undefined,
      region: body.region,
      description: body.description ?? "",
      image: body.image ?? "",
    };

    const created = await dbAdminCreateLocation(newItem);
    revalidatePath("/", "layout");
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
