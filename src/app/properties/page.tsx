import type { Metadata } from "next";
import { PropertiesClient } from "./PropertiesClient";
import { getAllProperties } from "@/data/properties";
import { getAllLocations } from "@/data/locations";
import { getAllDevelopers } from "@/data/developers";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse Signature Estates' curated catalogue of residential and commercial property across Egypt — apartments, villas, twin houses, penthouses, chalets, offices and land.",
  alternates: { canonical: "/properties" },
};

// Always read fresh data from Supabase.
export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const [properties, locations, developers] = await Promise.all([
    getAllProperties(),
    getAllLocations(),
    getAllDevelopers(),
  ]);

  return (
    <PropertiesClient
      properties={properties}
      locations={locations}
      developers={developers}
    />
  );
}
