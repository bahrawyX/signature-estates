import { readAll } from "@/lib/data-store";
import { NewsAdminClient } from "./NewsAdminClient";

export const dynamic = "force-dynamic";

export default function AdminNewsPage() {
  const news = readAll("news");
  return <NewsAdminClient initialItems={news} />;
}
