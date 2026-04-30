import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Eye, Compass, Handshake } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { PropertyCard } from "@/components/PropertyCard";
import { LocationCard } from "@/components/LocationCard";
import { NewsletterStrip } from "@/components/NewsletterStrip";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { properties } from "@/data/properties";
import { locations } from "@/data/locations";
import { developers } from "@/data/developers";
import { news } from "@/data/news";

export const dynamic = "force-dynamic";

export default function Home() {
  const featured = properties.filter((p) => p.featured).slice(0, 6);
  const locationsById = new Map(locations.map((l) => [l.id, l]));
  const developersById = new Map(developers.map((d) => [d.id, d]));
  const featuredLocations = [
    "new-cairo",
    "north-coast-sidi",
    "ras-el-hekma",
    "el-gouna",
    "new-capital",
    "sheikh-zayed",
  ]
    .map((id) => locations.find((l) => l.id === id))
    .filter(Boolean) as typeof locations;

  const propertyCounts = (id: string) =>
    properties.filter((p) => p.locationId === id).length;

  const latestNews = news.slice(0, 3);

  return (
    <>
      <HeroSection />
      <StatsBar />

      {/* Featured Properties */}
      <section className="relative py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-20">
            <SectionHeader
              eyebrow="Featured · This Quarter"
              title={
                <>
                  The properties our advisors
                  <br />
                  would buy <em className="font-display text-[var(--color-gold)]">themselves.</em>
                </>
              }
              description="A short, curated list. Updated quarterly. Not what's loudest in the market — what's positioned to age the best."
            />
            <Reveal delay={0.3}>
              <Link
                href="/properties"
                className="font-accent text-[10px] tracking-[0.2em] inline-flex items-center gap-2 group self-start lg:self-end"
              >
                View All
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Reveal>
          </div>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featured.map((p) => (
              <StaggerItem key={p.id}>
                <PropertyCard
                  property={p}
                  location={locationsById.get(p.locationId)}
                  developer={developersById.get(p.developerId)}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Locations */}
      <section className="relative bg-[var(--color-cream-dark)] py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 lg:mb-20 items-end">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="Where We Work"
                title={
                  <>
                    Twenty addresses,
                    <br />
                    one <span className="gold-shimmer">country.</span>
                  </>
                }
                description="From Madinaty to Marsa Matrouh — every market we represent gets the same standard of homework."
              />
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.2}>
                <p className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)] mb-2">
                  Coverage
                </p>
                <div className="gold-rule mb-4" />
                <p className="text-[15px] text-black/70 leading-relaxed">
                  Greater Cairo · North Coast · Red Sea · Sinai · Upper Egypt · The New Capital · Delta &amp; Canal Zone.
                </p>
              </Reveal>
            </div>
          </div>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredLocations.map((l) => (
              <StaggerItem key={l!.id}>
                <LocationCard location={l!} count={propertyCounts(l!.id)} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Why Signature Estates */}
      <section className="relative py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <SectionHeader
            eyebrow="Why Signature Estates"
            title={
              <>
                Discreet by default.
                <br />
                Right almost <em className="font-display text-[var(--color-gold)]">always.</em>
              </>
            }
            align="center"
            description="A short list of things we do differently — and why our buyers keep coming back."
            className="mb-20"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
            {[
              {
                icon: <Eye size={28} strokeWidth={1.2} />,
                title: "First-Look Access",
                body: "Marquee launches reach our desk before the public release. Our private list sees them first.",
              },
              {
                icon: <Compass size={28} strokeWidth={1.2} />,
                title: "Location Specialists",
                body: "We represent buyers in 20+ markets across Egypt — and refuse to brief on the ones we don't know.",
              },
              {
                icon: <Handshake size={28} strokeWidth={1.2} />,
                title: "Aligned Incentives",
                body: "We work for the buyer, not the developer. We show you what we'd buy ourselves — and what we wouldn't.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="bg-[var(--color-cream)] p-10 lg:p-12 h-full group">
                  <div className="text-[var(--color-gold)] mb-8">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-3xl mb-4 text-balance">{item.title}</h3>
                  <p className="text-[var(--color-gray)] leading-relaxed">{item.body}</p>
                  <div className="mt-8 h-px w-12 bg-black/15 group-hover:w-24 group-hover:bg-[var(--color-gold)] transition-all duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diagonal feature break */}
      <section className="relative bg-black text-white grain overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-24 lg:py-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 lg:col-start-1">
            <Reveal>
              <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold)]">
                The Signature Method
              </span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.05]">
                Three meetings.
                <br />
                One short list.
                <br />
                The right place.
              </h2>
              <p className="mt-6 text-white/65 leading-relaxed">
                We don't show you everything — we show you the four or five things that fit your brief, and the one we think you should buy. The shortlist is the product.
              </p>
              <div className="mt-10">
                <Button asChild variant="gold" size="lg">
                  <Link href="/about">Our Method</Link>
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 relative">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format&fit=crop"
                  alt="A premium Egyptian villa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 bg-[var(--color-gold)] text-black p-6 lg:p-8 max-w-xs">
                <p className="font-display text-3xl leading-tight">15 years on the ground in Egypt.</p>
                <p className="mt-3 font-accent text-[10px] tracking-[0.2em]">Est. 2010</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="relative py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-20">
            <SectionHeader
              eyebrow="Editorial"
              title={
                <>
                  Notes from
                  <br />
                  the <em className="font-display text-[var(--color-gold)]">market.</em>
                </>
              }
              description="Short, considered writing on the addresses, the launches, and the moves we're watching."
            />
            <Reveal delay={0.3}>
              <Link
                href="/news"
                className="font-accent text-[10px] tracking-[0.2em] inline-flex items-center gap-2 group"
              >
                All Editorial
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Reveal>
          </div>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <StaggerItem key={article.id}>
                <Link href={`/news/${article.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden mb-6">
                    <Image
                      src={article.cover}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <span className="font-accent text-[10px] tracking-[0.2em] text-[var(--color-gold-dark)]">
                    {article.category}
                  </span>
                  <h3 className="mt-3 font-display text-2xl lg:text-3xl text-balance leading-tight gold-underline inline">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-[var(--color-gray)] line-clamp-2">{article.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 font-accent text-[10px] tracking-[0.2em] text-[var(--color-gray)]">
                    <span>{article.author}</span>
                    <span className="opacity-30">·</span>
                    <span>{article.readMinutes} min read</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <NewsletterStrip />
    </>
  );
}
