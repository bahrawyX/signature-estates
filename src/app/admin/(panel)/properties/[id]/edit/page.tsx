import { notFound } from "next/navigation";
import {
  dbAdminGetProperty,
  dbAdminGetAllLocations,
  dbAdminGetAllDevelopers,
} from "@/lib/db";
import { PropertyForm } from "../../PropertyForm";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [property, locations, developers] = await Promise.all([
    dbAdminGetProperty(id),
    dbAdminGetAllLocations(),
    dbAdminGetAllDevelopers(),
  ]);
  if (!property) notFound();

  return (
    <PropertyForm
      mode="edit"
      property={property}
      locations={locations}
      developers={developers}
    />
  );
}
