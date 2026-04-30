import { dbAdminGetAllArticles } from "@/lib/db";
import { NewsAdminClient } from "./NewsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const news = await dbAdminGetAllArticles();
  return <NewsAdminClient initialItems={news} />;
}
