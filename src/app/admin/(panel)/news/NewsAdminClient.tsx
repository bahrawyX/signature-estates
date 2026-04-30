"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, ExternalLink } from "lucide-react";
import { DataTable, type Column, type FilterDef } from "@/components/admin/DataTable";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";
import type { NewsArticle, NewsCategory } from "@/lib/types";

const CATEGORIES: NewsCategory[] = [
  "Market Insights",
  "Project Launches",
  "Investment Tips",
  "Lifestyle",
];

export function NewsAdminClient({ initialItems }: { initialItems: NewsArticle[] }) {
  const router = useRouter();
  const toast = useToast();
  const [items, setItems] = React.useState<NewsArticle[]>(initialItems);
  const [confirm, setConfirm] = React.useState<NewsArticle | null>(null);

  async function handleDelete(a: NewsArticle) {
    try {
      const res = await fetch(`/api/admin/news/${a.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((it) => it.id !== a.id));
      toast.push("success", `Deleted: ${a.title}`);
      router.refresh();
    } catch {
      toast.push("error", "Could not delete article.");
    } finally {
      setConfirm(null);
    }
  }

  const columns: Column<NewsArticle>[] = [
    {
      key: "cover",
      header: "Cover",
      render: (a) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={a.cover}
          alt=""
          className="w-14 h-14 object-cover bg-[var(--color-cream-dark)]"
        />
      ),
      cellClassName: "w-20",
    },
    {
      key: "title",
      header: "Title",
      sortable: true,
      sortValue: (a) => a.title,
      render: (a) => (
        <div className="min-w-0 max-w-md">
          <p className="font-display text-base truncate">{a.title}</p>
          <p className="text-xs text-[var(--color-gray)] truncate">{a.slug}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      sortable: true,
      sortValue: (a) => a.category,
      render: (a) => (
        <span className="font-accent text-[10px] tracking-[0.18em] text-[var(--color-gold-dark)]">
          {a.category}
        </span>
      ),
    },
    {
      key: "author",
      header: "Author",
      sortable: true,
      sortValue: (a) => a.author,
      render: (a) => <span className="text-sm">{a.author}</span>,
    },
    {
      key: "publishedAt",
      header: "Published",
      sortable: true,
      sortValue: (a) => a.publishedAt,
      render: (a) => <span className="text-sm">{a.publishedAt}</span>,
    },
    {
      key: "readMinutes",
      header: "Read",
      render: (a) => (
        <span className="text-sm text-[var(--color-gray)]">{a.readMinutes} min</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (a) => (
        <div className="flex items-center gap-1">
          <Link
            href={`/news/${a.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center text-[var(--color-gray)] hover:text-black hover:bg-black/5 transition-colors"
            aria-label="Open public page"
          >
            <ExternalLink size={14} />
          </Link>
          <Link
            href={`/admin/news/${a.id}/edit`}
            className="w-9 h-9 flex items-center justify-center text-[var(--color-gray)] hover:text-[var(--color-gold-dark)] hover:bg-[var(--color-gold)]/10 transition-colors"
            aria-label="Edit"
          >
            <Pencil size={14} />
          </Link>
          <button
            onClick={() => setConfirm(a)}
            className="w-9 h-9 flex items-center justify-center text-[var(--color-gray)] hover:text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  const filters: FilterDef<NewsArticle>[] = [
    {
      key: "category",
      label: "Category",
      options: CATEGORIES.map((c) => ({ value: c, label: c })),
      predicate: (row, v) => row.category === v,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
            Editorial
          </p>
          <h1 className="mt-2 font-display text-3xl lg:text-4xl">News & Articles</h1>
          <p className="mt-2 text-sm text-[var(--color-gray)]">
            {items.length} article{items.length !== 1 && "s"} published.
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-black px-5 py-3 font-accent text-[10px] tracking-[0.22em] hover:bg-[var(--color-gold-dark)] transition-colors self-start"
        >
          <Plus size={14} /> Add Article
        </Link>
      </div>

      <DataTable<NewsArticle>
        rows={items}
        columns={columns}
        filters={filters}
        searchPredicate={(row, q) =>
          row.title.toLowerCase().includes(q) ||
          row.author.toLowerCase().includes(q) ||
          row.excerpt.toLowerCase().includes(q)
        }
        searchPlaceholder="Search by title, author, excerpt…"
        rowKey={(a) => a.id}
      />

      <ConfirmModal
        open={!!confirm}
        title="Delete this article?"
        message={
          confirm
            ? `"${confirm.title}" will be permanently removed. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        destructive
        onConfirm={() => confirm && handleDelete(confirm)}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
