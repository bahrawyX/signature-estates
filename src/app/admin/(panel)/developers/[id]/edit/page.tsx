import { notFound } from "next/navigation";
import { readOne } from "@/lib/data-store";
import { DeveloperForm } from "../../DeveloperForm";

export const dynamic = "force-dynamic";

export default async function EditDeveloperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const developer = readOne("developers", id);
  if (!developer) notFound();
  return <DeveloperForm mode="edit" developer={developer} />;
}
