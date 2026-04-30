import type { Metadata } from "next";
import { PropertiesClient } from "./PropertiesClient";
import { properties } from "@/data/properties";
import { locations } from "@/data/locations";
import { developers } from "@/data/developers";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse Signature Estates' curated catalogue of residential and commercial property across Egypt — apartments, villas, twin houses, penthouses, chalets, offices and land.",
  alternates: { canonical: "/properties" },
};

// Always read fresh data from the JSON store.
export const dynamic = "force-dynamic";

export default function PropertiesPage() {
  return (
    <PropertiesClient
      properties={properties}
      locations={locations}
      developers={developers}
    />
  );
}
