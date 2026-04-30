"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { news } from "@/data/news";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import type { NewsCategory } from "@/lib/types";

const CATEGORIES: ("All" | NewsCategory)[] = [
  "All",
  "Market Insights",
  "Project Launches",
  "Investment Tips",
  "Lifestyle",
];

export function NewsClient() {
  const [active, setActive] = React.useState<(typeof CATEGORIES)[number]>("All");
  const filtered = active === "All" ? news : news.filter((n) => n.category === active);

  return (
    <>
      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <span className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold-dark)]">
              Editorial
            </span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl text-balance leading-[1.02]">
              Notes from the <em className="font-display text-[var(--color-gold)]">Egyptian property market.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-base lg:text-lg text-[var(--color-gray)] leading-relaxed">
              Short, considered writing on the addresses, the launches, and the moves we're watching.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category filter */}
      <div className="border-y border-black/10 bg-[var(--color-cream)]/95 backdrop-blur-md sticky top-[72px] lg:top-[80px] z-30">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-4 flex items-center gap-2 lg:gap-4 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "font-accent text-[10px] tracking-[0.22em] py-2 px-4 transition-colors whitespace-nowrap",
                active === cat
                  ? "bg-black text-white"
                  : "border border-black/15 hover:border-black"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12"
            >
              {filtered.map((article, i) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
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
                    <span className="font-accent text-[10px] tracking-[0.22em] text-[var(--color-gold-dark)]">
                      {article.category}
                    </span>
                    <h2 className="mt-3 font-display text-2xl lg:text-3xl text-balance leading-tight gold-underline inline">
                      {article.title}
                    </h2>
                    <p className="mt-3 text-[var(--color-gray)] line-clamp-2">{article.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 font-accent text-[10px] tracking-[0.22em] text-[var(--color-gray)]">
                      <span>{article.author}</span>
                      <span className="opacity-30">·</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span className="opacity-30">·</span>
                      <span>{article.readMinutes} min</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
