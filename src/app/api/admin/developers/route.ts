import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  dbAdminGetAllDevelopers,
  dbAdminCreateDeveloper,
  dbAdminDeveloperIdTaken,
} from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { Developer } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const items = await dbAdminGetAllDevelopers();
    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  let body: Partial<Developer>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name) {
    return NextResponse.json({ error: "Missing required field: name" }, { status: 400 });
  }

  try {
    const baseId = slugify(body.shortName ?? body.name);
    let id = baseId;
    let i = 2;
    while (await dbAdminDeveloperIdTaken(id)) {
      id = `${baseId}-${i++}`;
      if (i > 100) break;
    }

    const newItem: Developer = {
      id,
      name: body.name,
      shortName: body.shortName || undefined,
      established: Number(body.established ?? new Date().getFullYear()),
      description: body.description ?? "",
    };

    const created = await dbAdminCreateDeveloper(newItem);
    revalidatePath("/", "layout");
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
