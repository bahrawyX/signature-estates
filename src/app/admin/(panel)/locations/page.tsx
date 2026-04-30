import { readAll } from "@/lib/data-store";
import { LocationsAdminClient } from "./LocationsAdminClient";

export const dynamic = "force-dynamic";

export default function AdminLocationsPage() {
  const locations = readAll("locations");
  return <LocationsAdminClient initialItems={locations} />;
}
