import type { Metadata } from "next";
import { NewsClient } from "./NewsClient";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "Editorial",
  description: "Signature Estates editorial — short, considered writing on Egyptian property: market insights, project launches, investment notes and lifestyle.",
  alternates: { canonical: "/news" },
};

export const dynamic = "force-dynamic";

export default function NewsPage() {
  return <NewsClient news={news} />;
}
