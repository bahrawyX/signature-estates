import { dbAdminGetAllLocations, dbAdminGetAllDevelopers } from "@/lib/db";
import { PropertyForm } from "../PropertyForm";

export const dynamic = "force-dynamic";

export default async function NewPropertyPage() {
  const [locations, developers] = await Promise.all([
    dbAdminGetAllLocations(),
    dbAdminGetAllDevelopers(),
  ]);
  return <PropertyForm mode="new" locations={locations} developers={developers} />;
}
