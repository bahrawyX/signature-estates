import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readAll, createOne } from "@/lib/data-store";
import { slugify } from "@/lib/utils";
import type { Developer } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  const items = readAll("developers");
  return NextResponse.json({ items });
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

  const all = readAll("developers");
  const taken = new Set(all.map((d) => d.id));
  const baseId = slugify(body.shortName ?? body.name);
  let id = baseId;
  let i = 2;
  while (taken.has(id)) id = `${baseId}-${i++}`;

  const newItem: Developer = {
    id,
    name: body.name,
    shortName: body.shortName || undefined,
    established: Number(body.established ?? new Date().getFullYear()),
    description: body.description ?? "",
  };

  createOne("developers", newItem);
  revalidatePath("/");
  revalidatePath("/developers");
  revalidatePath("/properties");

  return NextResponse.json({ item: newItem }, { status: 201 });
}
