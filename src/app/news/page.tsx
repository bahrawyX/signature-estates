import type { Metadata } from "next";
import { NewsClient } from "./NewsClient";
import { getAllArticles } from "@/data/news";

export const metadata: Metadata = {
  title: "Editorial",
  description:
    "Signature Estates editorial — short, considered writing on Egyptian property: market insights, project launches, investment notes and lifestyle.",
  alternates: { canonical: "/news" },
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const articles = await getAllArticles();
  return <NewsClient news={articles} />;
}
