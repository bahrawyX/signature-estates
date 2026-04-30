"use client";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/lib/types";
import { getLocation } from "@/data/locations";
import { getDeveloper } from "@/data/developers";
import { formatEGP, formatNumber, cn } from "@/lib/utils";

export function PropertyCard({ property, view = "grid" }: { property: Property; view?: "grid" | "list" }) {
  const location = getLocation(property.locationId);
  const developer = getDeveloper(property.developerId);

  if (view === "list") {
    return (
      <Link
        href={`/properties/${property.slug}`}
        className="group grid grid-cols-1 md:grid-cols-[400px_1fr] border border-black/10 bg-white card-hover overflow-hidden"
      >
        <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
          <Image
            src={property.images[0].src}
            alt={property.images[0].alt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <Badge variant="gold" className="absolute top-4 left-4">
            {property.status}
          </Badge>
        </div>
        <div className="p-8 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-accent text-[10px] tracking-[0.2em] text-[var(--color-gold-dark)]">
                {property.type}
              </span>
              <span className="font-accent text-[10px] tracking-[0.18em] text-[var(--color-gray)]">
                {developer?.shortName ?? developer?.name}
              </span>
            </div>
            <h3 className="mt-3 font-display text-3xl text-balance">{property.name}</h3>
            <p className="mt-1 text-sm text-[var(--color-gray)] flex items-center gap-1.5">
              <MapPin size={13} className="text-[var(--color-gold)]" />
              {location?.name}
            </p>
            <p className="mt-4 text-[15px] text-black/70 leading-relaxed line-clamp-2">{property.description}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-6 pt-5 border-t border-black/10">
            <Specs property={property} />
            <span className="font-display text-2xl">{formatEGP(property.priceEGP)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block border border-black/10 bg-white card-hover overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={property.images[0].src}
          alt={property.images[0].alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Badge variant="gold" className="absolute top-4 left-4">
          {property.status}
        </Badge>
        <Badge variant="outline" className="absolute top-4 right-4">
          {property.type}
        </Badge>
      </div>
      <div className="p-6 lg:p-7">
        <p className="font-accent text-[10px] tracking-[0.18em] text-[var(--color-gray)] flex items-center gap-1.5">
          <MapPin size={11} className="text-[var(--color-gold)]" />
          {location?.name}
          <span className="mx-1.5 opacity-30">·</span>
          {developer?.shortName ?? developer?.name}
        </p>
        <h3 className={cn(
          "mt-3 font-display text-2xl text-balance leading-tight",
          "transition-colors group-hover:text-[var(--color-gold-dark)]"
        )}>
          {property.name}
        </h3>
        <Specs className="mt-5" property={property} />
        <div className="mt-6 pt-5 border-t border-black/10 flex items-baseline justify-between">
          <span className="font-display text-2xl">{formatEGP(property.priceEGP)}</span>
          <span className="font-accent text-[10px] tracking-[0.2em] text-[var(--color-gold-dark)] gold-underline">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}

function Specs({ property, className }: { property: Property; className?: string }) {
  const items: Array<{ icon: React.ReactNode; value: string; label: string }> = [];
  if (property.bedrooms > 0) {
    items.push({ icon: <Bed size={13} />, value: String(property.bedrooms), label: "Beds" });
  } else if (property.type === "Apartment") {
    items.push({ icon: <Bed size={13} />, value: "Studio", label: "" });
  }
  if (property.bathrooms > 0) {
    items.push({ icon: <Bath size={13} />, value: String(property.bathrooms), label: "Baths" });
  }
  items.push({ icon: <Square size={13} />, value: formatNumber(property.areaSqm), label: "m²" });

  return (
    <div className={cn("flex items-center gap-5 text-sm text-[var(--color-gray)]", className)}>
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <span className="text-[var(--color-gold)]">{it.icon}</span>
          <span className="text-black">{it.value}</span>
          {it.label && <span className="text-[var(--color-gray)]">{it.label}</span>}
        </span>
      ))}
    </div>
  );
}
