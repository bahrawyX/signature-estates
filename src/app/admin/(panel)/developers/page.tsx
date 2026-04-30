import { dbAdminGetAllDevelopers } from "@/lib/db";
import { DevelopersAdminClient } from "./DevelopersAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminDevelopersPage() {
  const developers = await dbAdminGetAllDevelopers();
  return <DevelopersAdminClient initialItems={developers} />;
}
