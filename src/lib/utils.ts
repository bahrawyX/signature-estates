import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEGP(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `EGP ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `EGP ${(value / 1_000).toFixed(0)}K`;
  }
  return `EGP ${value.toLocaleString("en-EG")}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-EG").format(value);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
