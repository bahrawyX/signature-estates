import { readAll } from "@/lib/data-store";
import { DevelopersAdminClient } from "./DevelopersAdminClient";

export const dynamic = "force-dynamic";

export default function AdminDevelopersPage() {
  const developers = readAll("developers");
  return <DevelopersAdminClient initialItems={developers} />;
}
