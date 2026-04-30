"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EntityFormShell,
  FormSection,
  FormGrid,
} from "@/components/admin/EntityForm";
import { ImageUrlInput } from "@/components/admin/ImageUrlInput";
import { StringList } from "@/components/admin/DynamicList";
import { useToast } from "@/components/admin/Toast";
import { slugify } from "@/lib/utils";
import type { NewsArticle, NewsCategory } from "@/lib/types";

const CATEGORIES: NewsCategory[] = [
  "Market Insights",
  "Project Launches",
  "Investment Tips",
  "Lifestyle",
];

interface Props {
  mode: "new" | "edit";
  article?: NewsArticle;
}

export function NewsForm({ mode, article }: Props) {
  const router = useRouter();
  const toast = useToast();

  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = React.useState({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    excerpt: article?.excerpt ?? "",
    body: article?.body ?? [""],
    category: (article?.category as string) ?? "Market Insights",
    author: article?.author ?? "",
    publishedAt: article?.publishedAt ?? today,
    readMinutes: article?.readMinutes !== undefined ? String(article.readMinutes) : "4",
    cover: article?.cover ?? "",
  });
  const [slugTouched, setSlugTouched] = React.useState(mode === "edit");
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!slugTouched) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.title.trim()) return setError("Title is required.");
    if (!form.author.trim()) return setError("Author is required.");
    setSaving(true);

    const payload: Partial<NewsArticle> = {
      title: form.title.trim(),
      slug: form.slug.trim() || undefined,
      excerpt: form.excerpt,
      body: form.body.filter((p) => p.trim() !== ""),
      category: form.category as NewsCategory,
      author: form.author.trim(),
      publishedAt: form.publishedAt || today,
      readMinutes: Number(form.readMinutes) || 3,
      cover: form.cover,
    };

    try {
      const url =
        mode === "new" ? "/api/admin/news" : `/api/admin/news/${article!.id}`;
      const res = await fetch(url, {
        method: mode === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      toast.push("success", mode === "new" ? "Article created." : "Article updated.");
      router.push("/admin/news");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not save.";
      setError(message);
      toast.push("error", message);
      setSaving(false);
    }
  }

  return (
    <EntityFormShell
      title={mode === "new" ? "New Article" : "Edit Article"}
      subtitle={mode === "new" ? "Write a new editorial piece." : article?.title}
      backHref="/admin/news"
      backLabel="Back to articles"
      previewHref={mode === "edit" && article?.slug ? `/news/${article.slug}` : undefined}
      onSubmit={submit}
      saving={saving}
      primaryLabel={mode === "new" ? "Publish Article" : "Save Changes"}
      error={error}
    >
      <FormSection
        title="Headline"
        description="The title of the article and the URL slug."
      >
        <FormGrid cols={1}>
          <div className="space-y-2">
            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Ras El Hekma Is Quietly Rewriting Egypt's Coast"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => {
                setForm((f) => ({ ...f, slug: e.target.value }));
                setSlugTouched(true);
              }}
              placeholder="auto-generated-from-title"
            />
            <p className="text-xs text-[var(--color-gray)]">
              Public URL: <code className="text-[var(--color-gold-dark)]">/news/{form.slug || "your-slug"}</code>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              placeholder="A one or two sentence subtitle shown under the title and on the article card."
              className="min-h-[100px]"
            />
          </div>
        </FormGrid>
      </FormSection>

      <FormSection
        title="Meta"
        description="Category, author, publication date and estimated read time."
      >
        <FormGrid cols={2}>
          <div className="space-y-2">
            <Label>Category <span className="text-red-500">*</span></Label>
            <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author <span className="text-red-500">*</span></Label>
            <Input
              id="author"
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              placeholder="e.g. Yasmine El Sharkawy"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publishedAt">Published</Label>
            <Input
              id="publishedAt"
              type="date"
              value={form.publishedAt}
              onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="readMinutes">Read time (minutes)</Label>
            <Input
              id="readMinutes"
              type="number"
              min="1"
              max="60"
              value={form.readMinutes}
              onChange={(e) => setForm((f) => ({ ...f, readMinutes: e.target.value }))}
            />
          </div>
        </FormGrid>
      </FormSection>

      <FormSection
        title="Body"
        description="Each paragraph is a separate entry. Use the + button to add more paragraphs."
      >
        <StringList
          values={form.body}
          onChange={(v) => setForm((f) => ({ ...f, body: v }))}
          multiline
          placeholder="A paragraph of the article…"
          addLabel="Add paragraph"
        />
      </FormSection>

      <FormSection
        title="Cover Image"
        description="The hero image at the top of the article and on the article card."
      >
        <ImageUrlInput
          label="Cover image URL"
          value={form.cover}
          onChange={(v) => setForm((f) => ({ ...f, cover: v }))}
          hint="Format: https://images.unsplash.com/photo-XXXXX?w=1600&auto=format&fit=crop"
        />
      </FormSection>
    </EntityFormShell>
  );
}
