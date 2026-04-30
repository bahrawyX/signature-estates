import { readAll } from "@/lib/data-store";
import { PropertiesAdminClient } from "./PropertiesAdminClient";

export const dynamic = "force-dynamic";

export default function AdminPropertiesPage() {
  const properties = readAll("properties");
  const locations = readAll("locations");
  const developers = readAll("developers");

  return (
    <PropertiesAdminClient
      initialItems={properties}
      locations={locations}
      developers={developers}
    />
  );
}
