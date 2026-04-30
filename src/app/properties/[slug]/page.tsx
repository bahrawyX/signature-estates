import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bed, Bath, Square, Building2, Layers, MapPin, Calendar } from "lucide-react";
import {
  getProperty,
  getRelated,
  dbGetAllPropertySlugs,
} from "@/data/properties";
import { getLocation } from "@/data/locations";
import { getDeveloper } from "@/data/developers";
import { ImageGallery } from "@/components/ImageGallery";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatEGP, formatNumber } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await dbGetAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return {};
  const location = await getLocation(property.locationId);
  return {
    title: property.name,
    description: `${property.type} · ${location?.name} · ${formatEGP(property.priceEGP)}. ${property.description.slice(0, 140)}…`,
    alternates: { canonical: `/properties/${slug}` },
    openGraph: {
      title: property.name,
      description: property.description,
      images: [{ url: property.images[0].src, width: 1200, height: 800 }],
    },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();
  const [location, developer, related] = await Promise.all([
    getLocation(property.locationId),
    getDeveloper(property.developerId),
    getRelated(slug, property.locationId, property.type, 3),
  ]);

  // Resolve related properties' location + developer in one batched fetch.
  const relatedLocationIds = Array.from(new Set(related.map((r) => r.locationId)));
  const relatedDeveloperIds = Array.from(new Set(related.map((r) => r.developerId)));
  const [relatedLocations, relatedDevelopers] = await Promise.all([
    Promise.all(relatedLocationIds.map((id) => getLocation(id))),
    Promise.all(relatedDeveloperIds.map((id) => getDeveloper(id))),
  ]);
  const relatedLocationsById = new Map(
    relatedLocations.filter(Boolean).map((l) => [l!.id, l!]),
  );
  const relatedDevelopersById = new Map(
    relatedDevelopers.filter(Boolean).map((d) => [d!.id, d!]),
  );

  return (
    <>
      <section className="pt-32 lg:pt-40 pb-10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)]">
              <Link href="/properties" className="hover:text-black">Properties</Link>
              <span className="opacity-40">/</span>
              <span>{property.type}</span>
              <span className="opacity-40">/</span>
              <span className="text-black">{location?.name}</span>
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap gap-2 mb-5">
                  <Badge variant="gold">{property.status}</Badge>
                  <Badge variant="outline">{property.type}</Badge>
                  {property.featured && <Badge variant="dark">Featured</Badge>}
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-balance leading-[1.02]">
                  {property.name}
                </h1>
                <p className="mt-4 text-lg text-[var(--color-gray)] flex items-center gap-2">
                  <MapPin size={16} className="text-[var(--color-gold)]" />
                  {location?.name}, Egypt
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <p className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)]">From</p>
                <p className="font-display text-5xl lg:text-6xl text-[var(--color-gold-dark)]">
                  {formatEGP(property.priceEGP)}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <ImageGallery images={property.images} />
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 border-y border-black/10 py-8">
                <Spec icon={<Bed size={18} />} value={property.bedrooms === 0 ? "Studio" : String(property.bedrooms)} label="Bedrooms" />
                <Spec icon={<Bath size={18} />} value={String(property.bathrooms)} label="Bathrooms" />
                <Spec icon={<Square size={18} />} value={`${formatNumber(property.areaSqm)} m²`} label="Area" />
                {property.floor !== undefined && (
                  <Spec icon={<Layers size={18} />} value={String(property.floor)} label="Floor" />
                )}
                <Spec icon={<Building2 size={18} />} value={property.status} label="Status" />
              </div>
            </Reveal>

            <Reveal>
              <h2 className="mt-16 font-display text-3xl lg:text-4xl">About this residence</h2>
              <p className="mt-6 text-base lg:text-lg leading-relaxed text-black/75 text-pretty">
                {property.description}
              </p>
            </Reveal>

            <Reveal>
              <h2 className="mt-16 font-display text-3xl lg:text-4xl">Amenities</h2>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                {property.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-[15px] py-2 border-b border-black/5">
                    <span className="block w-1.5 h-1.5 bg-[var(--color-gold)]" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="mt-16 font-display text-3xl lg:text-4xl">Location</h2>
              <p className="mt-3 text-[var(--color-gray)]">{location?.description}</p>
              <div className="mt-8 aspect-[16/9] border border-black/10 overflow-hidden">
                <iframe
                  src={property.mapUrl}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${property.name}`}
                  className="block"
                />
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 border border-black/10 bg-white p-8 lg:p-10">
              <p className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold-dark)]">
                {developer?.name}
              </p>
              {property.deliveryYear && (
                <p className="mt-2 font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)] inline-flex items-center gap-2">
                  <Calendar size={11} /> Delivery {property.deliveryYear}
                </p>
              )}
              <p className="mt-4 font-display text-3xl">{formatEGP(property.priceEGP)}</p>
              <div className="gold-rule my-7" />
              <h3 className="font-display text-2xl">Request information</h3>
              <p className="mt-2 text-sm text-[var(--color-gray)]">An advisor will be in touch within one working day.</p>
              <form className="mt-6 grid gap-4">
                <div>
                  <Label>Full name</Label>
                  <Input className="mt-2" required name="name" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input className="mt-2" type="email" required name="email" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input className="mt-2" type="tel" name="phone" />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea className="mt-2" rows={3} name="message" defaultValue={`I'd like more information on ${property.name}.`} />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <Button type="submit" variant="gold" size="lg">Request Info</Button>
                  <Button asChild variant="outline" size="lg" type="button">
                    <Link href="/contact">Book a Visit</Link>
                  </Button>
                </div>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-24 bg-[var(--color-cream-dark)]">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <Reveal>
              <div className="flex items-end justify-between mb-12">
                <h2 className="font-display text-3xl lg:text-5xl">Similar properties</h2>
                <Link href="/properties" className="font-accent text-[10px] tracking-[0.22em] gold-underline">
                  All properties →
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  location={relatedLocationsById.get(p.locationId)}
                  developer={relatedDevelopersById.get(p.developerId)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Spec({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="text-[var(--color-gold)] mb-2">{icon}</div>
      <p className="font-display text-2xl">{value}</p>
      <p className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)] mt-1">{label}</p>
    </div>
  );
}
