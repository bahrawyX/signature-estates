import type { Property } from "@/lib/types";
import {
  dbGetAllProperties,
  dbGetFeaturedProperties,
  dbGetProperty,
  dbGetRelatedProperties,
  dbGetAllPropertySlugs,
} from "@/lib/db";

// Async data accessors — every page that needs properties must await these.
export {
  dbGetAllProperties as getAllProperties,
  dbGetFeaturedProperties as getFeaturedProperties,
  dbGetProperty as getProperty,
  dbGetRelatedProperties as getRelated,
  dbGetAllPropertySlugs,
};

// Legacy named export — kept so existing imports don't crash at compile time.
// Anything using this directly must migrate to `await getAllProperties()`.
export const properties: Property[] = [];
