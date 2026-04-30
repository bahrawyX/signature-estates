import type { MetadataRoute } from "next";
import { getAllProperties } from "@/data/properties";
import { getAllArticles } from "@/data/news";

const BASE = "https://signatureestates.eg";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, news] = await Promise.all([
    getAllProperties(),
    getAllArticles(),
  ]);

  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/properties",
    "/about",
    "/developers",
    "/investment-plans",
    "/news",
    "/contact",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${BASE}/properties/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${BASE}/news/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...articleRoutes];
}
