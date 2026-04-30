"use client";
import * as React from "react";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterBar } from "@/components/FilterBar";
import { DEFAULT_FILTERS, type FilterState } from "@/lib/propertyTypes";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import type { Property, Location, Developer } from "@/lib/types";

const PER_PAGE = 9;

function applyFilters(list: Property[], f: FilterState) {
  return list.filter((p) => {
    if (f.type !== "All" && p.type !== f.type) return false;
    if (f.location !== "All" && p.locationId !== f.location) return false;
    if (f.developer !== "All" && p.developerId !== f.developer) return false;
    if (f.development !== "All" && !p.name.toLowerCase().includes(f.development.toLowerCase())) return false;
    if (f.status !== "All" && p.status !== f.status) return false;
    if (p.priceEGP < f.priceMin || p.priceEGP > f.priceMax) return false;
    if (f.beds !== "Any") {
      if (f.beds === "Studio" && p.bedrooms !== 0) return false;
      else if (f.beds === "5+" && p.bedrooms < 5) return false;
      else if (!isNaN(Number(f.beds)) && p.bedrooms !== Number(f.beds)) return false;
    }
    return true;
  });
}

function applySort(list: Property[], sort: string) {
  const arr = [...list];
  switch (sort) {
    case "price-asc": return arr.sort((a, b) => a.priceEGP - b.priceEGP);
    case "price-desc": return arr.sort((a, b) => b.priceEGP - a.priceEGP);
    case "newest": return arr.reverse();
    case "featured":
    default:
      return arr.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }
}

interface PropertiesInnerProps {
  properties: Property[];
  locations: Location[];
  developers: Developer[];
}

function PropertiesInner({ properties, locations, developers }: PropertiesInnerProps) {
  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS);
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(
    () => applySort(applyFilters(properties, filters), filters.sort),
    [filters, properties],
  );

  React.useEffect(() => setPage(1), [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice(0, page * PER_PAGE);

  const locationsById = React.useMemo(
    () => new Map(locations.map((l) => [l.id, l])),
    [locations],
  );
  const developersById = React.useMemo(
    () => new Map(developers.map((d) => [d.id, d])),
    [developers],
  );

  return (
    <>
      <section className="relative pt-32 lg:pt-40 pb-12 lg:pb-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
              The Catalogue
            </span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl text-balance leading-[1.02]">
              Egypt's most considered <em className="font-display text-[var(--color-gold)]">addresses</em>, in one place.
            </h1>
            <p className="mt-6 max-w-2xl text-base lg:text-lg text-[var(--color-gray)] leading-relaxed">
              Apartments, villas, twin houses, penthouses, chalets, offices and land —
              filtered by location, developer and development.
            </p>
          </Reveal>
        </div>
      </section>

      <FilterBar
        total={filtered.length}
        view={view}
        onViewChange={setView}
        filters={filters}
        onChange={setFilters}
        locations={locations}
        developers={developers}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {visible.length === 0 ? (
            <div className="border border-black/10 p-16 text-center">
              <p className="font-display text-3xl">Nothing matches that brief.</p>
              <p className="mt-3 text-[var(--color-gray)]">Try widening the price band, or unlocking a few filters.</p>
              <div className="mt-8">
                <Button variant="outline" onClick={() => setFilters(DEFAULT_FILTERS)}>Reset filters</Button>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={view === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  : "flex flex-col gap-6"
                }
              >
                {visible.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (i % 9) * 0.04 }}
                  >
                    <PropertyCard
                      property={p}
                      view={view}
                      location={locationsById.get(p.locationId)}
                      developer={developersById.get(p.developerId)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {visible.length < filtered.length && (
            <div className="mt-16 text-center">
              <Button variant="outline" size="lg" onClick={() => setPage((p) => p + 1)}>
                Load more · Page {page + 1} of {totalPages}
              </Button>
            </div>
          )}

          {visible.length > 0 && visible.length === filtered.length && filtered.length > PER_PAGE && (
            <p className="mt-12 text-center font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)]">
              That's all {filtered.length} matches — refine to see more options.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export function PropertiesClient(props: PropertiesInnerProps) {
  return (
    <Suspense fallback={<div className="pt-40 px-6 lg:px-12 max-w-[1400px] mx-auto">Loading…</div>}>
      <PropertiesInner {...props} />
    </Suspense>
  );
}
