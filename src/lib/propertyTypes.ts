// ── Property type hierarchy (no "use client" — safe to import anywhere) ──

export const RES_APARTMENTS = [
  "Flat Apartment",
  "Loft",
  "Penthouse",
  "Garden Apartment",
  "Duplex",
] as const;

export const RES_VILLAS = [
  "Standalone Villa",
  "One Story Villa",
  "Town House",
  "Twin House",
  "Family House",
] as const;

export const COM_SHOPS = ["Retail", "F&B"] as const;
export const COM_OTHER = ["Office", "Clinic"] as const;

export const ALL_SPECIFIC_TYPES: string[] = [
  ...RES_APARTMENTS,
  ...RES_VILLAS,
  "Chalet",
  ...COM_SHOPS,
  ...COM_OTHER,
  "Land",
];

// ── Filter state ───────────────────────────────────────────────────────────

export const PRICE_MIN = 500_000;
export const PRICE_MAX = 100_000_000;

export interface FilterState {
  type: string;
  location: string;
  developer: string;
  development: string;
  beds: string;
  status: string;
  priceMin: number;
  priceMax: number;
  sort: string;
}

export const DEFAULT_FILTERS: FilterState = {
  type: "All",
  location: "All",
  developer: "All",
  development: "All",
  beds: "Any",
  status: "All",
  priceMin: PRICE_MIN,
  priceMax: PRICE_MAX,
  sort: "featured",
};
