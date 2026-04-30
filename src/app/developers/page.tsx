import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { developers } from "@/data/developers";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Egypt's most trusted real-estate developers — ORA, Emaar Misr, TMG, SODIC, Palm Hills and more, curated by Signature Estates.",
};

const DEVELOPER_IMAGES: Record<string, string> = {
  ora: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop",
  "emaar-misr": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
  tmg: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
  sodic: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
  "palm-hills": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop",
  "mountain-view": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
  marakez: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
  "hassan-allam": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
  "misr-italia": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
  "tatweer-misr": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop",
  inertia: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop",
  lmd: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
};

export default function DevelopersPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-36 lg:pt-44 pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
              Our Partners
            </span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl text-balance leading-[1.02]">
              Egypt's finest <em className="text-[var(--color-gold)]">developers</em>,<br />
              in one address book.
            </h1>
            <p className="mt-6 max-w-2xl text-base lg:text-lg text-[var(--color-gray)] leading-relaxed">
              We work exclusively with developers whose track record, delivery timelines, and
              design standards meet our clients' expectations. Twelve names. No compromise.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="gold-rule mx-6 lg:mx-12" />

      {/* ── Grid ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8">
            {developers.map((dev) => (
              <StaggerItem key={dev.id}>
                <Link
                  href={`/properties?developer=${dev.id}`}
                  className="group relative flex flex-col bg-[var(--color-cream)] overflow-hidden card-hover"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={DEVELOPER_IMAGES[dev.id] ?? "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop"}
                      alt={dev.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <p className="font-accent text-[9px] tracking-[0.25em] text-white/70 uppercase">
                        Est. {dev.established}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col gap-3 flex-1 border border-black/8 border-t-0">
                    <h2 className="font-display text-2xl leading-tight group-hover:text-[var(--color-gold)] transition-colors duration-300">
                      {dev.name}
                    </h2>
                    <p className="text-sm text-[var(--color-gray)] leading-relaxed line-clamp-3">
                      {dev.description}
                    </p>
                    <span className="mt-auto font-accent text-[9px] tracking-[0.25em] text-[var(--color-gold-dark)] uppercase">
                      View Properties →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────── */}
      <section className="bg-[var(--color-dark)] grain py-20 lg:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 text-center relative z-10">
          <Reveal>
            <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
              Work With Us
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-white text-balance">
              Representing the right developers<br />for the right clients.
            </h2>
            <p className="mt-5 text-[var(--color-gray-light)] max-w-xl mx-auto">
              Our team understands each developer's product intimately — phase by phase,
              unit by unit. Tell us what you're looking for.
            </p>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--color-gold)] text-black font-accent text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:bg-[var(--color-gold-dark)] transition-colors"
              >
                Register Interest
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-accent text-[10px] tracking-[0.22em] uppercase px-8 py-4 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
              >
                Browse Properties
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
