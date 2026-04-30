"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden text-white grain">
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=85&auto=format&fit=crop"
        alt="A premium Egyptian residence at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div className="relative z-10 h-full mx-auto max-w-[1400px] px-6 lg:px-12 flex flex-col">
        <div className="flex-1 flex items-end pb-10 lg:pb-24">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <span className="block w-10 h-px bg-[var(--color-gold)]" />
              <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold)]">
                Egypt — Est. 2010
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-[112px] leading-[0.95] text-balance">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
                className="block"
              >
                Find Your Place
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.25 }}
                className="block"
              >
                in Egypt's <em className="not-italic text-[var(--color-gold)] font-display">Finest</em>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
                className="block"
              >
                Addresses.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="mt-8 max-w-xl text-base md:text-lg text-white/80 leading-relaxed"
            >
              A private real-estate house representing buyers across the country's
              most considered neighbourhoods — Sahel, Sokhna, the Capital, the
              Red Sea, and every quiet corner of Cairo worth knowing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.75 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button asChild variant="gold" size="lg">
                <Link href="/properties">Explore Properties</Link>
              </Button>
              <Button asChild variant="ghostLight" size="lg">
                <Link href="/contact">Register Interest</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-6 lg:left-12 flex items-center gap-3 text-white/55 font-accent text-[10px] tracking-[0.3em]"
        >
          <ArrowDown size={14} className="animate-bounce" />
          <span>Scroll to explore</span>
        </motion.div>

        <div className="absolute bottom-8 right-6 lg:right-12 hidden md:flex flex-col items-end gap-1 text-white/55 font-accent text-[10px] tracking-[0.25em]">
          <span>30.0444° N</span>
          <span>31.2357° E</span>
        </div>
      </div>
    </section>
  );
}
