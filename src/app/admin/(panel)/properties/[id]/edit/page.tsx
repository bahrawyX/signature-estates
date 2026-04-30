import { notFound } from "next/navigation";
import { readAll, readOne } from "@/lib/data-store";
import { PropertyForm } from "../../PropertyForm";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = readOne("properties", id);
  if (!property) notFound();

  const locations = readAll("locations");
  const developers = readAll("developers");

  return (
    <PropertyForm
      mode="edit"
      property={property}
      locations={locations}
      developers={developers}
    />
  );
}
