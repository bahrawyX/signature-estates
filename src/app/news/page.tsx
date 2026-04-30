import type { Metadata } from "next";
import { NewsClient } from "./NewsClient";

export const metadata: Metadata = {
  title: "Editorial",
  description: "Signature Estates editorial — short, considered writing on Egyptian property: market insights, project launches, investment notes and lifestyle.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return <NewsClient />;
}
