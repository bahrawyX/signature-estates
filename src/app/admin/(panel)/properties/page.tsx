import {
  dbAdminGetAllProperties,
  dbAdminGetAllLocations,
  dbAdminGetAllDevelopers,
} from "@/lib/db";
import { PropertiesAdminClient } from "./PropertiesAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const [properties, locations, developers] = await Promise.all([
    dbAdminGetAllProperties(),
    dbAdminGetAllLocations(),
    dbAdminGetAllDevelopers(),
  ]);

  return (
    <PropertiesAdminClient
      initialItems={properties}
      locations={locations}
      developers={developers}
    />
  );
}
