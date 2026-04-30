import type { Metadata } from "next";
import { PropertiesClient } from "./PropertiesClient";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse Signature Estates' curated catalogue of residential and commercial property across Egypt — apartments, villas, twin houses, penthouses, chalets, offices and land.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  return <PropertiesClient />;
}
