"use client";
import * as React from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  /** Render function for the cell. */
  render: (row: T) => React.ReactNode;
  /** If true, this column can be sorted by. Provide `sortValue`. */
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  /** Optional CSS class on the <td>. */
  cellClassName?: string;
  /** Optional CSS class on the <th>. */
  headerClassName?: string;
}

export interface FilterDef<T> {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  /** Predicate: return true if the row passes when value is selected. */
  predicate: (row: T, value: string) => boolean;
}

interface DataTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  filters?: FilterDef<T>[];
  /** Search predicate. Receives row + lowercase search query. */
  searchPredicate?: (row: T, q: string) => boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  emptyText?: string;
  /** Provided externally so the parent can refresh after deletions. */
  rowKey: (row: T) => string;
}

export function DataTable<T>({
  rows,
  columns,
  filters = [],
  searchPredicate,
  searchPlaceholder = "Search…",
  pageSize = 20,
  emptyText = "No items match.",
  rowKey,
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>(
    Object.fromEntries(filters.map((f) => [f.key, "All"])),
  );
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState(1);

  // Reset page when inputs change
  React.useEffect(() => {
    setPage(1);
  }, [query, filterValues, sortKey, sortDir]);

  const filtered = React.useMemo(() => {
    let out = rows;
    if (searchPredicate && query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter((r) => searchPredicate(r, q));
    }
    for (const f of filters) {
      const v = filterValues[f.key];
      if (v && v !== "All") out = out.filter((r) => f.predicate(r, v));
    }
    if (sortKey) {
      const col = columns.find((c) => c.key === sortKey);
      if (col?.sortValue) {
        const sv = col.sortValue;
        const dir = sortDir === "asc" ? 1 : -1;
        out = [...out].sort((a, b) => {
          const va = sv(a);
          const vb = sv(b);
          if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
          return String(va).localeCompare(String(vb)) * dir;
        });
      }
    }
    return out;
  }, [rows, query, filterValues, sortKey, sortDir, columns, filters, searchPredicate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        {searchPredicate && (
          <div className="relative lg:max-w-sm flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gray)]"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9"
            />
          </div>
        )}

        {filters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <select
                key={f.key}
                value={filterValues[f.key]}
                onChange={(e) =>
                  setFilterValues((prev) => ({ ...prev, [f.key]: e.target.value }))
                }
                className="h-10 px-3 border border-black/15 bg-white text-sm"
              >
                <option value="All">{f.label}: All</option>
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {f.label}: {o.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-black/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 bg-[var(--color-cream-dark)]/40">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "text-left px-4 py-3 font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)] uppercase",
                    c.sortable && "cursor-pointer hover:text-black",
                    c.headerClassName,
                  )}
                  onClick={c.sortable ? () => toggleSort(c.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {c.header}
                    {c.sortable && sortKey === c.key && (
                      sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-16 text-center">
                  <p className="text-[var(--color-gray)]">{emptyText}</p>
                </td>
              </tr>
            ) : (
              visible.map((row) => (
                <tr
                  key={rowKey(row)}
                  className="border-b border-black/5 hover:bg-[var(--color-cream-dark)]/40 transition-colors"
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={cn("px-4 py-3 align-middle", c.cellClassName)}
                    >
                      {c.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)]">
            Page {page} of {totalPages} · {filtered.length} items
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-4 h-9 border border-black/15 hover:bg-black hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-4 h-9 border border-black/15 hover:bg-black hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
