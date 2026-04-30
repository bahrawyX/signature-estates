"use client";
import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 500, suffix: "+", label: "Properties Curated" },
  { value: 20, suffix: "+", label: "Locations Across Egypt" },
  { value: 15, suffix: "", label: "Years on the Ground" },
  { value: 1200, suffix: "+", label: "Happy Clients" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString("en-EG"));

  React.useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 2, ease: [0.2, 0.8, 0.2, 1] });
      return () => controls.stop();
    }
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      {suffix && <span className="text-[var(--color-gold)] ml-0.5">{suffix}</span>}
    </span>
  );
}

export function StatsBar({ dark = false }: { dark?: boolean }) {
  return (
    <section
      className={
        dark
          ? "relative bg-black text-white grain"
          : "relative border-y border-black/10 bg-[var(--color-cream)]"
      }
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 relative">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.1 }}
            className="text-center lg:text-left"
          >
            <div className="font-display text-5xl lg:text-6xl tabular-nums">
              <Counter to={stat.value} suffix={stat.suffix} />
            </div>
            <div className={"mt-3 font-accent text-[10px] tracking-[0.22em] " + (dark ? "text-white/55" : "text-[var(--color-gray)]")}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
