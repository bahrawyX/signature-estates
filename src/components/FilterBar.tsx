"use client";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Filter, LayoutGrid, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locations } from "@/data/locations";
import { developers } from "@/data/developers";
import { formatEGP, cn } from "@/lib/utils";

// ── Type hierarchy ──────────────────────────────────────────
export const RES_APARTMENTS = ["Flat Apartment", "Loft", "Penthouse", "Garden Apartment", "Duplex"] as const;
export const RES_VILLAS = ["Standalone Villa", "One Story Villa", "Town House", "Twin House", "Family House"] as const;
export const COM_SHOPS = ["Retail", "F&B"] as const;
export const COM_OTHER = ["Office", "Clinic"] as const;

export const ALL_SPECIFIC_TYPES: string[] = [
  ...RES_APARTMENTS, ...RES_VILLAS, "Chalet",
  ...COM_SHOPS, ...COM_OTHER,
  "Land",
];
const BEDROOMS = ["Any", "Studio", "1", "2", "3", "4", "5+"];
const STATUSES = ["All", "Ready to Move", "Off-Plan", "Under Construction"];
const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price ↑" },
  { id: "price-desc", label: "Price ↓" },
  { id: "newest", label: "Newest" },
];

const PRICE_MIN = 500_000;
const PRICE_MAX = 100_000_000;

export interface FilterState {
  type: string;
  location: string;
  developer: string;
  development: string;
  beds: string;
  status: string;
  priceMin: number;
  priceMax: number;
  sort: string;
}

export const DEFAULT_FILTERS: FilterState = {
  type: "All",
  location: "All",
  developer: "All",
  development: "All",
  beds: "Any",
  status: "All",
  priceMin: PRICE_MIN,
  priceMax: PRICE_MAX,
  sort: "featured",
};

const developments = [
  "All",
  "ZED East",
  "Mivida",
  "Belle Vie",
  "Silver Sands",
  "Eastown",
  "O West",
  "Capital Diamond",
  "Hacienda Bay",
  "Il Monte Galala",
  "Fouka Bay",
  "Aliva",
  "IL Bosco",
  "Jefaira",
  "Ninety Five Avenue",
];

export function FilterBar({
  total,
  view,
  onViewChange,
  filters,
  onChange,
  sticky = true,
}: {
  total: number;
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
  filters: FilterState;
  onChange: (f: FilterState) => void;
  sticky?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();

  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const reset = () => onChange(DEFAULT_FILTERS);

  const activeCount =
    (filters.type !== "All" ? 1 : 0) +
    (filters.location !== "All" ? 1 : 0) +
    (filters.developer !== "All" ? 1 : 0) +
    (filters.development !== "All" ? 1 : 0) +
    (filters.beds !== "Any" ? 1 : 0) +
    (filters.status !== "All" ? 1 : 0) +
    (filters.priceMin !== PRICE_MIN || filters.priceMax !== PRICE_MAX ? 1 : 0);

  React.useEffect(() => {
    const t = searchParams.get("type");
    const l = searchParams.get("location");
    if (t || l) {
      onChange({
        ...filters,
        type: t && ALL_SPECIFIC_TYPES.includes(t) ? t : filters.type,
        location: l && (locations.find((x) => x.id === l)) ? l : filters.location,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerRow = (
    <div className="flex items-center justify-between gap-4 px-6 lg:px-12 py-5">
      <div className="flex items-center gap-5">
        <button
          className="lg:hidden inline-flex items-center gap-2 font-accent text-[10px] tracking-[0.2em]"
          onClick={() => setOpen((v) => !v)}
        >
          <Filter size={14} />
          Filters
          {activeCount > 0 && (
            <span className="bg-[var(--color-gold)] text-black text-[10px] px-1.5">
              {activeCount}
            </span>
          )}
        </button>
        <p className="hidden lg:block font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)]">
          {total} {total === 1 ? "Property" : "Properties"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <Label className="hidden lg:inline">Sort</Label>
          <Select value={filters.sort} onValueChange={(v) => update("sort", v)}>
            <SelectTrigger className="h-10 w-44 border-black/15">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORTS.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex border border-black/15">
          <button
            onClick={() => onViewChange("grid")}
            className={cn(
              "h-10 w-10 inline-flex items-center justify-center transition-colors",
              view === "grid" ? "bg-black text-white" : "hover:bg-black/5"
            )}
            aria-label="Grid view"
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={cn(
              "h-10 w-10 inline-flex items-center justify-center border-l border-black/15 transition-colors",
              view === "list" ? "bg-black text-white" : "hover:bg-black/5"
            )}
            aria-label="List view"
          >
            <List size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  const fields = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-x-6 gap-y-5 px-6 lg:px-12 pb-6">
      <Field label="Property Type">
        <Select value={filters.type} onValueChange={(v) => update("type", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent className="max-h-[380px]">
            <SelectItem value="All">All Properties</SelectItem>

            {/* ── RESIDENTIAL ─────────────────── */}
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel className="font-accent text-[9px] tracking-[0.22em] text-[var(--color-gold-dark)] uppercase pt-1">
                Residential
              </SelectLabel>
              {/* Apartments */}
              <SelectLabel className="pl-5 text-[10px] text-[var(--color-gray)] font-normal pb-0 pt-1">
                Apartments
              </SelectLabel>
              {RES_APARTMENTS.map((t) => (
                <SelectItem key={t} value={t} className="pl-8">{t}</SelectItem>
              ))}
              {/* Villas */}
              <SelectLabel className="pl-5 text-[10px] text-[var(--color-gray)] font-normal pb-0 pt-1">
                Villas
              </SelectLabel>
              {RES_VILLAS.map((t) => (
                <SelectItem key={t} value={t} className="pl-8">
                  {t === "Standalone Villa" ? "Standalone" : t === "One Story Villa" ? "One Story" : t}
                </SelectItem>
              ))}
              {/* Beach & Resort */}
              <SelectLabel className="pl-5 text-[10px] text-[var(--color-gray)] font-normal pb-0 pt-1">
                Beach & Resort
              </SelectLabel>
              <SelectItem value="Chalet" className="pl-8">Chalet</SelectItem>
            </SelectGroup>

            {/* ── COMMERCIAL ──────────────────── */}
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel className="font-accent text-[9px] tracking-[0.22em] text-[var(--color-gold-dark)] uppercase pt-1">
                Commercial
              </SelectLabel>
              {/* Shops */}
              <SelectLabel className="pl-5 text-[10px] text-[var(--color-gray)] font-normal pb-0 pt-1">
                Shops
              </SelectLabel>
              <SelectItem value="Retail" className="pl-8">Retail</SelectItem>
              <SelectItem value="F&B" className="pl-8">Food & Beverage (F&B)</SelectItem>
              {/* Other commercial */}
              <SelectItem value="Office" className="pl-5">Offices</SelectItem>
              <SelectItem value="Clinic" className="pl-5">Clinics</SelectItem>
            </SelectGroup>

            {/* ── OTHER ───────────────────────── */}
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel className="font-accent text-[9px] tracking-[0.22em] text-[var(--color-gray)] uppercase pt-1">
                Other
              </SelectLabel>
              <SelectItem value="Land" className="pl-5">Land</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field label="Location">
        <Select value={filters.location} onValueChange={(v) => update("location", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All locations</SelectItem>
            {locations.map((l) => (
              <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Developer">
        <Select value={filters.developer} onValueChange={(v) => update("developer", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All developers</SelectItem>
            {developers.map((d) => (
              <SelectItem key={d.id} value={d.id}>{d.shortName ?? d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Development">
        <Select value={filters.development} onValueChange={(v) => update("development", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {developments.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Bedrooms">
        <Select value={filters.beds} onValueChange={(v) => update("beds", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {BEDROOMS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Status">
        <Select value={filters.status} onValueChange={(v) => update("status", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>

      <Field label={`Price · ${formatEGP(filters.priceMin)} – ${formatEGP(filters.priceMax)}`}>
        <div className="h-11 flex items-center">
          <Slider
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={500_000}
            value={[filters.priceMin, filters.priceMax]}
            onValueChange={(v) => onChange({ ...filters, priceMin: v[0], priceMax: v[1] })}
          />
        </div>
      </Field>
    </div>
  );

  return (
    <div className={cn("border-y border-black/10 bg-[var(--color-cream)]/95 backdrop-blur-md z-30", sticky && "sticky top-[72px] lg:top-[80px]")}>
      {headerRow}
      <div className="hidden lg:block border-t border-black/5">{fields}</div>

      {/* Active filter chips + reset */}
      {activeCount > 0 && (
        <div className="hidden lg:flex items-center gap-3 px-6 lg:px-12 pb-5 flex-wrap">
          <span className="font-accent text-[10px] tracking-[0.2em] text-[var(--color-gray)]">
            {activeCount} active
          </span>
          <button
            className="font-accent text-[10px] tracking-[0.2em] text-[var(--color-gold-dark)] gold-underline"
            onClick={reset}
          >
            Reset all
          </button>
        </div>
      )}

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-black/10">
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
            <span className="font-accent text-[10px] tracking-[0.22em]">Filters</span>
            <button onClick={() => setOpen(false)} aria-label="Close filters">
              <X size={18} />
            </button>
          </div>
          {fields}
          <div className="flex gap-3 px-6 pb-6">
            <Button variant="outline" onClick={reset} className="flex-1">Reset</Button>
            <Button onClick={() => setOpen(false)} className="flex-1">Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
