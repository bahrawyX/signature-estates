import fs from "fs";
import path from "path";
import type { Location } from "@/lib/types";

const FALLBACK: Location[] = [];

function loadData(): Location[] {
  try {
    const filePath = path.join(process.cwd(), "data-store", "locations.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Location[]) : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export const locations: Location[] = loadData();

export function getLocation(id: string) {
  return locations.find((l) => l.id === id);
}
