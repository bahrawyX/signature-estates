import fs from "fs";
import path from "path";
import type { NewsArticle } from "@/lib/types";

const FALLBACK: NewsArticle[] = [];

function loadData(): NewsArticle[] {
  try {
    const filePath = path.join(process.cwd(), "data-store", "news.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as NewsArticle[]) : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export const news: NewsArticle[] = loadData();

export function getArticle(slug: string) {
  return news.find((n) => n.slug === slug);
}
