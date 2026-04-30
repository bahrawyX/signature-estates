import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: number | string;
  hint?: string;
  href?: string;
  icon?: React.ReactNode;
  accent?: boolean;
}

export function StatsCard({ label, value, hint, href, icon, accent }: StatsCardProps) {
  const Inner = (
    <div
      className={cn(
        "group relative bg-white p-6 lg:p-7 border border-black/8 transition-all duration-300",
        href && "hover:border-[var(--color-gold)] hover:shadow-lg",
        accent && "bg-[var(--color-dark)] text-white border-transparent",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p
          className={cn(
            "font-accent text-[10px] tracking-[0.22em] uppercase",
            accent ? "text-white/60" : "text-[var(--color-gray)]",
          )}
        >
          {label}
        </p>
        {icon && (
          <div className={cn("text-[var(--color-gold)]", accent && "text-[var(--color-gold)]")}>
            {icon}
          </div>
        )}
      </div>
      <p
        className={cn(
          "mt-4 font-display text-4xl lg:text-5xl leading-none",
          accent ? "text-white" : "text-black",
        )}
      >
        {value}
      </p>
      {hint && (
        <p className={cn("mt-3 text-sm", accent ? "text-white/60" : "text-[var(--color-gray)]")}>
          {hint}
        </p>
      )}
      {href && (
        <ArrowUpRight
          size={16}
          className="absolute bottom-5 right-5 text-[var(--color-gold)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      )}
    </div>
  );

  if (href) return <Link href={href}>{Inner}</Link>;
  return Inner;
}
