import Link from "next/link";
import { Building2, MapPin, Briefcase, Newspaper, Plus } from "lucide-react";
import {
  dbAdminGetAllProperties,
  dbAdminGetAllLocations,
  dbAdminGetAllDevelopers,
  dbAdminGetAllArticles,
} from "@/lib/db";
import { StatsCard } from "@/components/admin/StatsCard";
import { formatEGP } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [properties, locations, developers, news] = await Promise.all([
    dbAdminGetAllProperties(),
    dbAdminGetAllLocations(),
    dbAdminGetAllDevelopers(),
    dbAdminGetAllArticles(),
  ]);

  const ready = properties.filter((p) => p.status === "Ready to Move").length;
  const offPlan = properties.filter((p) => p.status === "Off-Plan").length;
  const underConstr = properties.filter((p) => p.status === "Under Construction").length;
  const featured = properties.filter((p) => p.featured).length;

  // properties from dbAdminGetAllProperties() are sorted desc by created_at, so
  // the first 5 are the most recent.
  const recentProperties = properties.slice(0, 5);
  const recentNews = [...news]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
            Dashboard
          </p>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl">
            Welcome back to <em className="text-[var(--color-gold)]">Estates</em>.
          </h1>
          <p className="mt-3 text-[var(--color-gray)] max-w-lg">
            A quick read on the catalogue. Use the sidebar to manage every section.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-black px-5 py-3 font-accent text-[10px] tracking-[0.22em] hover:bg-[var(--color-gold-dark)] transition-colors"
          >
            <Plus size={14} /> Add Property
          </Link>
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 border border-black/20 px-5 py-3 font-accent text-[10px] tracking-[0.22em] hover:border-black hover:bg-black hover:text-white transition-colors"
          >
            <Plus size={14} /> Add Article
          </Link>
          <Link
            href="/admin/developers/new"
            className="inline-flex items-center gap-2 border border-black/20 px-5 py-3 font-accent text-[10px] tracking-[0.22em] hover:border-black hover:bg-black hover:text-white transition-colors"
          >
            <Plus size={14} /> Add Developer
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          label="Properties"
          value={properties.length}
          hint={`${ready} ready · ${offPlan} off-plan · ${underConstr} under constr.`}
          href="/admin/properties"
          icon={<Building2 size={18} strokeWidth={1.4} />}
        />
        <StatsCard
          label="Locations"
          value={locations.length}
          hint="Egyptian hotspots covered"
          href="/admin/locations"
          icon={<MapPin size={18} strokeWidth={1.4} />}
        />
        <StatsCard
          label="Developers"
          value={developers.length}
          hint="Master developer profiles"
          href="/admin/developers"
          icon={<Briefcase size={18} strokeWidth={1.4} />}
        />
        <StatsCard
          label="News Articles"
          value={news.length}
          hint="Editorial pieces published"
          href="/admin/news"
          icon={<Newspaper size={18} strokeWidth={1.4} />}
        />
      </div>

      {/* Featured spotlight */}
      <div className="bg-[var(--color-dark)] grain text-white p-8 lg:p-10 relative overflow-hidden">
        <div className="relative">
          <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold)]">
            Featured Listings
          </p>
          <h2 className="mt-3 font-display text-3xl">
            {featured} of {properties.length} properties on the public homepage.
          </h2>
          <p className="mt-3 text-white/65 text-sm max-w-xl">
            Toggle the <span className="text-[var(--color-gold)]">Featured</span> star on any
            property to add or remove it from the homepage carousel.
          </p>
        </div>
      </div>

      {/* Recent items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Recent properties */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl">Recent Properties</h2>
            <Link
              href="/admin/properties"
              className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold-dark)] hover:text-[var(--color-gold)] gold-underline"
            >
              View all
            </Link>
          </div>
          <div className="bg-white border border-black/8 divide-y divide-black/5">
            {recentProperties.length === 0 ? (
              <p className="p-6 text-sm text-[var(--color-gray)]">No properties yet.</p>
            ) : (
              recentProperties.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/properties/${p.id}/edit`}
                  className="flex items-center gap-4 p-4 hover:bg-[var(--color-cream-dark)]/40 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.images?.[0]?.src}
                    alt=""
                    className="w-14 h-14 object-cover bg-[var(--color-cream-dark)] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base truncate">{p.name}</p>
                    <p className="text-xs text-[var(--color-gray)] mt-1">
                      {p.type} · {p.status}
                    </p>
                  </div>
                  <p className="font-accent text-[11px] tracking-[0.18em] text-[var(--color-gold-dark)] shrink-0">
                    {formatEGP(p.priceEGP)}
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Recent news */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl">Recent Articles</h2>
            <Link
              href="/admin/news"
              className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold-dark)] hover:text-[var(--color-gold)] gold-underline"
            >
              View all
            </Link>
          </div>
          <div className="bg-white border border-black/8 divide-y divide-black/5">
            {recentNews.length === 0 ? (
              <p className="p-6 text-sm text-[var(--color-gray)]">No articles yet.</p>
            ) : (
              recentNews.map((a) => (
                <Link
                  key={a.id}
                  href={`/admin/news/${a.id}/edit`}
                  className="flex items-center gap-4 p-4 hover:bg-[var(--color-cream-dark)]/40 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.cover}
                    alt=""
                    className="w-14 h-14 object-cover bg-[var(--color-cream-dark)] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base truncate">{a.title}</p>
                    <p className="text-xs text-[var(--color-gray)] mt-1">
                      {a.category} · {a.author}
                    </p>
                  </div>
                  <p className="font-accent text-[10px] tracking-[0.2em] text-[var(--color-gray)] shrink-0">
                    {a.publishedAt}
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
