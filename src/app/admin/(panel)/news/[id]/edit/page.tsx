import { notFound } from "next/navigation";
import { dbAdminGetArticle } from "@/lib/db";
import { NewsForm } from "../../NewsForm";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await dbAdminGetArticle(id);
  if (!article) notFound();
  return <NewsForm mode="edit" article={article} />;
}
