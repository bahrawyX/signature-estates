import { dbAdminGetAllLocations } from "@/lib/db";
import { LocationsAdminClient } from "./LocationsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminLocationsPage() {
  const locations = await dbAdminGetAllLocations();
  return <LocationsAdminClient initialItems={locations} />;
}
