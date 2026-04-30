import fs from "fs";
import path from "path";
import type { Developer } from "@/lib/types";

const FALLBACK: Developer[] = [];

function loadData(): Developer[] {
  try {
    const filePath = path.join(process.cwd(), "data-store", "developers.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Developer[]) : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export const developers: Developer[] = loadData();

export function getDeveloper(id: string) {
  return developers.find((d) => d.id === id);
}
