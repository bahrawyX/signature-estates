import { notFound } from "next/navigation";
import { readOne } from "@/lib/data-store";
import { NewsForm } from "../../NewsForm";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = readOne("news", id);
  if (!article) notFound();
  return <NewsForm mode="edit" article={article} />;
}
