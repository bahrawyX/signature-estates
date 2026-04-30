import { notFound } from "next/navigation";
import { dbAdminGetDeveloper } from "@/lib/db";
import { DeveloperForm } from "../../DeveloperForm";

export const dynamic = "force-dynamic";

export default async function EditDeveloperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const developer = await dbAdminGetDeveloper(id);
  if (!developer) notFound();
  return <DeveloperForm mode="edit" developer={developer} />;
}
