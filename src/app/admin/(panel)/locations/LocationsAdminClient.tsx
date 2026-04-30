"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";
import type { Location } from "@/lib/types";

export function LocationsAdminClient({ initialItems }: { initialItems: Location[] }) {
  const router = useRouter();
  const toast = useToast();
  const [items, setItems] = React.useState<Location[]>(initialItems);
  const [confirm, setConfirm] = React.useState<Location | null>(null);

  async function handleDelete(loc: Location) {
    try {
      const res = await fetch(`/api/admin/locations/${loc.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((it) => it.id !== loc.id));
      toast.push("success", `Deleted: ${loc.name}`);
      router.refresh();
    } catch {
      toast.push("error", "Could not delete location.");
    } finally {
      setConfirm(null);
    }
  }

  // Group by region for nicer browsing
  const byRegion = React.useMemo(() => {
    const map = new Map<string, Location[]>();
    for (const l of items) {
      if (!map.has(l.region)) map.set(l.region, []);
      map.get(l.region)!.push(l);
    }
    return Array.from(map.entries());
  }, [items]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
            Coverage Map
          </p>
          <h1 className="mt-2 font-display text-3xl lg:text-4xl">Locations</h1>
          <p className="mt-2 text-sm text-[var(--color-gray)]">
            {items.length} location{items.length !== 1 && "s"} across {byRegion.length} regions.
          </p>
        </div>
        <Link
          href="/admin/locations/new"
          className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-black px-5 py-3 font-accent text-[10px] tracking-[0.22em] hover:bg-[var(--color-gold-dark)] transition-colors self-start"
        >
          <Plus size={14} /> Add Location
        </Link>
      </div>

      {byRegion.length === 0 ? (
        <div className="bg-white border border-black/8 p-12 text-center">
          <p className="text-[var(--color-gray)]">No locations yet.</p>
        </div>
      ) : (
        byRegion.map(([region, locs]) => (
          <section key={region}>
            <h2 className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gray)] mb-4">
              {region}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {locs.map((l) => (
                <article
                  key={l.id}
                  className="group bg-white border border-black/8 hover:border-[var(--color-gold)]/40 transition-colors overflow-hidden"
                >
                  <div className="relative aspect-[16/10] bg-[var(--color-cream-dark)] overflow-hidden">
                    {l.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={l.image}
                        alt={l.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-display text-xl">{l.name}</p>
                    {l.arabicName && (
                      <p className="text-sm text-[var(--color-gray)]" dir="rtl">
                        {l.arabicName}
                      </p>
                    )}
                    <p className="mt-3 text-sm text-[var(--color-gray)] line-clamp-2 leading-relaxed">
                      {l.description}
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                      <Link
                        href={`/admin/locations/${l.id}/edit`}
                        className="inline-flex items-center gap-2 px-3 py-2 font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold-dark)] hover:bg-[var(--color-gold)]/10 transition-colors"
                      >
                        <Pencil size={12} /> Edit
                      </Link>
                      <button
                        onClick={() => setConfirm(l)}
                        className="inline-flex items-center gap-2 px-3 py-2 font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)] hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))
      )}

      <ConfirmModal
        open={!!confirm}
        title="Delete this location?"
        message={
          confirm
            ? `"${confirm.name}" will be removed. Properties tied to this location will keep their stored ID, but it won't appear in filters until a matching location is recreated.`
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
