import { notFound } from "next/navigation";
import { readOne } from "@/lib/data-store";
import { LocationForm } from "../../LocationForm";

export const dynamic = "force-dynamic";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = readOne("locations", id);
  if (!location) notFound();
  return <LocationForm mode="edit" location={location} />;
}
