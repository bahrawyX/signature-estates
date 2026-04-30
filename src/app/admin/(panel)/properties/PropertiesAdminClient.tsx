"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Star, ExternalLink } from "lucide-react";
import { DataTable, type Column, type FilterDef } from "@/components/admin/DataTable";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";
import { formatEGP, cn } from "@/lib/utils";
import type { Property, Location, Developer } from "@/lib/types";
import { ALL_SPECIFIC_TYPES } from "@/lib/propertyTypes";

interface Props {
  initialItems: Property[];
  locations: Location[];
  developers: Developer[];
}

export function PropertiesAdminClient({ initialItems, locations, developers }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [items, setItems] = React.useState<Property[]>(initialItems);
  const [confirm, setConfirm] = React.useState<Property | null>(null);
  const [busyIds, setBusyIds] = React.useState<Set<string>>(new Set());

  const locationName = React.useCallback(
    (id: string) => locations.find((l) => l.id === id)?.name ?? id,
    [locations],
  );
  const developerName = React.useCallback(
    (id: string) => {
      const d = developers.find((dv) => dv.id === id);
      return d?.shortName ?? d?.name ?? id;
    },
    [developers],
  );

  async function handleToggleFeatured(p: Property) {
    setBusyIds((prev) => new Set(prev).add(p.id));
    // Optimistic update
    setItems((prev) =>
      prev.map((it) => (it.id === p.id ? { ...it, featured: !it.featured } : it)),
    );
    try {
      const res = await fetch(`/api/admin/properties/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !p.featured }),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.push("success", `${!p.featured ? "Featured" : "Unfeatured"}: ${p.name}`);
    } catch {
      // Revert
      setItems((prev) =>
        prev.map((it) => (it.id === p.id ? { ...it, featured: p.featured } : it)),
      );
      toast.push("error", "Could not update featured status.");
    } finally {
      setBusyIds((prev) => {
        const next = new Set(prev);
        next.delete(p.id);
        return next;
      });
    }
  }

  async function handleDelete(p: Property) {
    try {
      const res = await fetch(`/api/admin/properties/${p.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setItems((prev) => prev.filter((it) => it.id !== p.id));
      toast.push("success", `Deleted: ${p.name}`);
      router.refresh();
    } catch {
      toast.push("error", "Could not delete property.");
    } finally {
      setConfirm(null);
    }
  }

  const columns: Column<Property>[] = [
    {
      key: "image",
      header: "Image",
      render: (p) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.images?.[0]?.src}
          alt=""
          className="w-14 h-14 object-cover bg-[var(--color-cream-dark)]"
        />
      ),
      cellClassName: "w-20",
    },
    {
      key: "name",
      header: "Name",
      sortable: true,
      sortValue: (p) => p.name,
      render: (p) => (
        <div className="min-w-0">
          <p className="font-display text-base truncate">{p.name}</p>
          <p className="text-xs text-[var(--color-gray)] truncate">{p.slug}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      sortable: true,
      sortValue: (p) => p.type,
      render: (p) => <span className="text-sm">{p.type}</span>,
    },
    {
      key: "location",
      header: "Location",
      sortable: true,
      sortValue: (p) => locationName(p.locationId),
      render: (p) => <span className="text-sm">{locationName(p.locationId)}</span>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortValue: (p) => p.status,
      render: (p) => (
        <span
          className={cn(
            "font-accent text-[9px] tracking-[0.2em] px-2 py-1 inline-block",
            p.status === "Ready to Move" && "bg-emerald-50 text-emerald-700",
            p.status === "Off-Plan" && "bg-amber-50 text-amber-700",
            p.status === "Under Construction" && "bg-blue-50 text-blue-700",
          )}
        >
          {p.status}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      sortValue: (p) => p.priceEGP,
      render: (p) => (
        <span className="font-accent text-[11px] tracking-[0.16em] text-[var(--color-gold-dark)]">
          {formatEGP(p.priceEGP)}
        </span>
      ),
    },
    {
      key: "featured",
      header: "Featured",
      render: (p) => (
        <button
          onClick={() => handleToggleFeatured(p)}
          disabled={busyIds.has(p.id)}
          className={cn(
            "w-9 h-9 flex items-center justify-center transition-colors disabled:opacity-50",
            p.featured ? "text-[var(--color-gold)]" : "text-black/20 hover:text-[var(--color-gold)]",
          )}
          aria-label={p.featured ? "Remove from featured" : "Mark as featured"}
        >
          <Star size={16} fill={p.featured ? "currentColor" : "none"} />
        </button>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (p) => (
        <div className="flex items-center gap-1">
          <Link
            href={`/properties/${p.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center text-[var(--color-gray)] hover:text-black hover:bg-black/5 transition-colors"
            aria-label="Open public page"
          >
            <ExternalLink size={14} />
          </Link>
          <Link
            href={`/admin/properties/${p.id}/edit`}
            className="w-9 h-9 flex items-center justify-center text-[var(--color-gray)] hover:text-[var(--color-gold-dark)] hover:bg-[var(--color-gold)]/10 transition-colors"
            aria-label="Edit"
          >
            <Pencil size={14} />
          </Link>
          <button
            onClick={() => setConfirm(p)}
            className="w-9 h-9 flex items-center justify-center text-[var(--color-gray)] hover:text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  const filters: FilterDef<Property>[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "Ready to Move", label: "Ready to Move" },
        { value: "Off-Plan", label: "Off-Plan" },
        { value: "Under Construction", label: "Under Construction" },
      ],
      predicate: (row, value) => row.status === value,
    },
    {
      key: "type",
      label: "Type",
      options: ALL_SPECIFIC_TYPES.map((t) => ({ value: t, label: t })),
      predicate: (row, value) => row.type === value,
    },
    {
      key: "location",
      label: "Location",
      options: locations.map((l) => ({ value: l.id, label: l.name })),
      predicate: (row, value) => row.locationId === value,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
            Catalogue
          </p>
          <h1 className="mt-2 font-display text-3xl lg:text-4xl">Properties</h1>
          <p className="mt-2 text-sm text-[var(--color-gray)]">
            {items.length} listing{items.length !== 1 && "s"} across{" "}
            {new Set(items.map((p) => p.locationId)).size} location
            {new Set(items.map((p) => p.locationId)).size !== 1 && "s"}.
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-black px-5 py-3 font-accent text-[10px] tracking-[0.22em] hover:bg-[var(--color-gold-dark)] transition-colors self-start"
        >
          <Plus size={14} /> Add Property
        </Link>
      </div>

      <DataTable<Property>
        rows={items}
        columns={columns}
        filters={filters}
        searchPredicate={(row, q) =>
          row.name.toLowerCase().includes(q) ||
          row.type.toLowerCase().includes(q) ||
          locationName(row.locationId).toLowerCase().includes(q) ||
          developerName(row.developerId).toLowerCase().includes(q)
        }
        searchPlaceholder="Search by name, type, location, developer…"
        rowKey={(p) => p.id}
      />

      <ConfirmModal
        open={!!confirm}
        title="Delete this property?"
        message={
          confirm
            ? `"${confirm.name}" will be permanently removed from the catalogue. This cannot be undone.`
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
