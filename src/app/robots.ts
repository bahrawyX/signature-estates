import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://signatureestates.eg/sitemap.xml",
    host: "https://signatureestates.eg",
  };
}
