import fs from "fs";
import path from "path";
import type { Property } from "@/lib/types";

// Hardcoded fallback — used only if the JSON file is missing.
// The data-store/properties.json file is the live source of truth.
const FALLBACK: Property[] = [];

function loadData(): Property[] {
  try {
    const filePath = path.join(process.cwd(), "data-store", "properties.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Property[]) : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export const properties: Property[] = loadData();

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export function getRelated(slug: string, count = 3) {
  const current = properties.find((p) => p.slug === slug);
  if (!current) return [];
  return properties
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.locationId === current.locationId || p.type === current.type),
    )
    .slice(0, count);
}
