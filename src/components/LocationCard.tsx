import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Location } from "@/lib/types";

export function LocationCard({
  location,
  count,
  className = "",
}: {
  location: Location;
  count: number;
  className?: string;
}) {
  return (
    <Link
      href={`/properties?location=${location.id}`}
      className={"group relative block overflow-hidden bg-black " + className}
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={location.image}
          alt={location.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      </div>
      <div className="absolute inset-0 p-7 lg:p-8 flex flex-col justify-between text-white">
        <div className="flex items-start justify-between">
          <span className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold)]">
            {location.region}
          </span>
          <ArrowUpRight
            size={20}
            className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all"
          />
        </div>
        <div>
          {location.arabicName && (
            <p className="font-display text-xl text-white/65 mb-2" lang="ar" dir="rtl">
              {location.arabicName}
            </p>
          )}
          <h3 className="font-display text-3xl lg:text-4xl text-balance leading-tight">{location.name}</h3>
          <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
            <span className="font-accent text-[10px] tracking-[0.22em] text-white/70">
              {count} {count === 1 ? "Property" : "Properties"}
            </span>
            <span className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold)]">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
