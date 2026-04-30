export type PropertyType =
  // Residential › Apartments
  | "Flat Apartment"
  | "Loft"
  | "Penthouse"
  | "Garden Apartment"
  | "Duplex"
  // Residential › Villas
  | "Standalone Villa"
  | "One Story Villa"
  | "Town House"
  | "Twin House"
  | "Family House"
  // Residential › Beach & Resort
  | "Chalet"
  // Commercial › Shops
  | "Retail"
  | "F&B"
  // Commercial
  | "Office"
  | "Clinic"
  // Other
  | "Land";

export type PropertyStatus =
  | "Ready to Move"
  | "Off-Plan"
  | "Under Construction";

export interface PropertyImage {
  src: string;
  alt: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus;
  locationId: string;
  developerId: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  floor?: number;
  priceEGP: number;
  description: string;
  amenities: string[];
  images: PropertyImage[];
  featured?: boolean;
  mapUrl: string;
  deliveryYear?: number;
}

export interface Location {
  id: string;
  name: string;
  arabicName?: string;
  region:
    | "Greater Cairo"
    | "North Coast & Mediterranean"
    | "Red Sea & Sinai"
    | "Upper Egypt"
    | "New Capital"
    | "Delta & Canal Zone";
  description: string;
  image: string;
}

export interface Developer {
  id: string;
  name: string;
  shortName?: string;
  established: number;
  description: string;
}

export type NewsCategory =
  | "Market Insights"
  | "Project Launches"
  | "Investment Tips"
  | "Lifestyle";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: NewsCategory;
  author: string;
  publishedAt: string;
  readMinutes: number;
  cover: string;
}
