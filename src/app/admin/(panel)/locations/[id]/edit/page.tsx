import { notFound } from "next/navigation";
import { dbAdminGetLocation } from "@/lib/db";
import { LocationForm } from "../../LocationForm";

export const dynamic = "force-dynamic";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await dbAdminGetLocation(id);
  if (!location) notFound();
  return <LocationForm mode="edit" location={location} />;
}
