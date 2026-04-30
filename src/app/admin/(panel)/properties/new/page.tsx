import { readAll } from "@/lib/data-store";
import { PropertyForm } from "../PropertyForm";

export const dynamic = "force-dynamic";

export default function NewPropertyPage() {
  const locations = readAll("locations");
  const developers = readAll("developers");
  return <PropertyForm mode="new" locations={locations} developers={developers} />;
}
