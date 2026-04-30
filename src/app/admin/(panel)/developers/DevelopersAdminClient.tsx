"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";
import type { Developer } from "@/lib/types";

export function DevelopersAdminClient({ initialItems }: { initialItems: Developer[] }) {
  const router = useRouter();
  const toast = useToast();
  const [items, setItems] = React.useState<Developer[]>(initialItems);
  const [confirm, setConfirm] = React.useState<Developer | null>(null);

  async function handleDelete(d: Developer) {
    try {
      const res = await fetch(`/api/admin/developers/${d.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((it) => it.id !== d.id));
      toast.push("success", `Deleted: ${d.name}`);
      router.refresh();
    } catch {
      toast.push("error", "Could not delete developer.");
    } finally {
      setConfirm(null);
    }
  }

  const columns: Column<Developer>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      sortValue: (d) => d.name,
      render: (d) => (
        <div>
          <p className="font-display text-base">{d.name}</p>
          <p className="text-xs text-[var(--color-gray)]">ID: {d.id}</p>
        </div>
      ),
    },
    {
      key: "shortName",
      header: "Short Name",
      render: (d) => <span className="text-sm">{d.shortName ?? "—"}</span>,
    },
    {
      key: "established",
      header: "Established",
      sortable: true,
      sortValue: (d) => d.established,
      render: (d) => (
        <span className="font-accent text-[11px] tracking-[0.18em] text-[var(--color-gold-dark)]">
          {d.established}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (d) => (
        <p className="text-sm text-[var(--color-gray)] line-clamp-2 max-w-md">
          {d.description}
        </p>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (d) => (
        <div className="flex items-center gap-1">
          <Link
            href={`/admin/developers/${d.id}/edit`}
            className="w-9 h-9 flex items-center justify-center text-[var(--color-gray)] hover:text-[var(--color-gold-dark)] hover:bg-[var(--color-gold)]/10 transition-colors"
            aria-label="Edit"
          >
            <Pencil size={14} />
          </Link>
          <button
            onClick={() => setConfirm(d)}
            className="w-9 h-9 flex items-center justify-center text-[var(--color-gray)] hover:text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
            Master Developers
          </p>
          <h1 className="mt-2 font-display text-3xl lg:text-4xl">Developers</h1>
          <p className="mt-2 text-sm text-[var(--color-gray)]">
            {items.length} developer{items.length !== 1 && "s"} on file.
          </p>
        </div>
        <Link
          href="/admin/developers/new"
          className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-black px-5 py-3 font-accent text-[10px] tracking-[0.22em] hover:bg-[var(--color-gold-dark)] transition-colors self-start"
        >
          <Plus size={14} /> Add Developer
        </Link>
      </div>

      <DataTable<Developer>
        rows={items}
        columns={columns}
        searchPredicate={(row, q) =>
          row.name.toLowerCase().includes(q) ||
          (row.shortName ?? "").toLowerCase().includes(q) ||
          row.description.toLowerCase().includes(q)
        }
        searchPlaceholder="Search developers…"
        rowKey={(d) => d.id}
      />

      <ConfirmModal
        open={!!confirm}
        title="Delete this developer?"
        message={
          confirm
            ? `"${confirm.name}" will be removed. Properties tied to this developer will retain their stored ID.`
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
