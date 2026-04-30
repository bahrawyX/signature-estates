"use client";
import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PropertyImage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ImageGallery({ images }: { images: PropertyImage[] }) {
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const main = images[active];

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, images.length]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
        <button
          className="relative col-span-1 lg:col-span-8 aspect-[4/3] overflow-hidden bg-black"
          onClick={() => setOpen(true)}
          aria-label="Open gallery"
        >
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
        </button>
        <div className="col-span-1 lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4">
          {images.slice(0, 3).map((img, i) => (
            <button
              key={img.src + i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/3] lg:aspect-auto overflow-hidden",
                i === active && "ring-1 ring-[var(--color-gold)]"
              )}
            >
              <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 grain flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <button
            className="absolute left-6 text-white/80 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setActive((i) => (i - 1 + images.length) % images.length); }}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="absolute right-6 text-white/80 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setActive((i) => (i + 1) % images.length); }}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
          <div
            className="relative w-[92vw] h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={main.src} alt={main.alt} fill className="object-contain" />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-accent text-[10px] tracking-[0.3em] text-white/60">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
