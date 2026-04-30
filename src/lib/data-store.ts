// Server-only filesystem helpers for the JSON-backed data store.
// Do NOT import this from any "use client" component — it relies on Node's `fs`.

import fs from "fs";
import path from "path";
import type {
  Property,
  Location,
  Developer,
  NewsArticle,
} from "@/lib/types";

export type EntityName = "properties" | "locations" | "developers" | "news";

type EntityMap = {
  properties: Property;
  locations: Location;
  developers: Developer;
  news: NewsArticle;
};

const DATA_DIR = path.join(process.cwd(), "data-store");

function fileFor(entity: EntityName): string {
  return path.join(DATA_DIR, `${entity}.json`);
}

/** Read all items for an entity. Returns [] if the file is missing or unreadable. */
export function readAll<E extends EntityName>(entity: E): EntityMap[E][] {
  try {
    const raw = fs.readFileSync(fileFor(entity), "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as EntityMap[E][]) : [];
  } catch {
    return [];
  }
}

/** Write the full array atomically (temp file + rename) so partial writes don't corrupt the JSON. */
export function writeAll<E extends EntityName>(
  entity: E,
  items: EntityMap[E][],
): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const target = fileFor(entity);
  const tmp = `${target}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(items, null, 2), "utf-8");
  fs.renameSync(tmp, target);
}

/** Find a single item by `id`. */
export function readOne<E extends EntityName>(
  entity: E,
  id: string,
): EntityMap[E] | null {
  const all = readAll(entity);
  return all.find((it) => it.id === id) ?? null;
}

/** Find a single item by `slug` (only properties + news have slugs). */
export function readBySlug<E extends "properties" | "news">(
  entity: E,
  slug: string,
): EntityMap[E] | null {
  const all = readAll(entity);
  return all.find((it) => it.slug === slug) ?? null;
}

/** Append a new item. Caller is responsible for assigning a unique `id` first. */
export function createOne<E extends EntityName>(
  entity: E,
  item: EntityMap[E],
): EntityMap[E] {
  const all = readAll(entity);
  all.push(item);
  writeAll(entity, all);
  return item;
}

/** Replace an item by id. Returns the updated item, or null if not found. */
export function updateOne<E extends EntityName>(
  entity: E,
  id: string,
  patch: Partial<EntityMap[E]>,
): EntityMap[E] | null {
  const all = readAll(entity);
  const idx = all.findIndex((it) => it.id === id);
  if (idx === -1) return null;
  const merged = { ...all[idx], ...patch } as EntityMap[E];
  all[idx] = merged;
  writeAll(entity, all);
  return merged;
}

/** Delete an item by id. Returns true if removed. */
export function deleteOne<E extends EntityName>(
  entity: E,
  id: string,
): boolean {
  const all = readAll(entity);
  const next = all.filter((it) => it.id !== id);
  if (next.length === all.length) return false;
  writeAll(entity, next);
  return true;
}

/* ─────────────────── ID + slug helpers ─────────────────── */

const ID_PREFIX: Record<EntityName, string> = {
  properties: "p",
  locations: "loc",
  developers: "dev",
  news: "n",
};

/** Generate a unique id of form `{prefix}-{NNN}` that doesn't collide with existing items. */
export function generateId(entity: EntityName): string {
  const all = readAll(entity);
  const prefix = ID_PREFIX[entity];
  // Find the largest numeric suffix among existing ids matching the prefix-NNN pattern.
  let maxN = 0;
  for (const item of all) {
    const id: string = item.id ?? "";
    const m = id.match(new RegExp(`^${prefix}-(\\d+)$`));
    if (m) {
      const n = parseInt(m[1], 10);
      if (n > maxN) maxN = n;
    }
  }
  const next = (maxN + 1).toString().padStart(3, "0");
  return `${prefix}-${next}`;
}

/** Ensure a slug is unique within an entity by appending `-2`, `-3`, ... if it collides. */
export function uniqueSlug(
  entity: "properties" | "news",
  baseSlug: string,
  excludeId?: string,
): string {
  const all = readAll(entity);
  const taken = new Set(all.filter((it) => it.id !== excludeId).map((it) => it.slug));
  if (!taken.has(baseSlug)) return baseSlug;
  let i = 2;
  while (taken.has(`${baseSlug}-${i}`)) i++;
  return `${baseSlug}-${i}`;
}
