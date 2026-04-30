import type { Location } from "@/lib/types";
import { dbGetAllLocations, dbGetLocation } from "@/lib/db";

export {
  dbGetAllLocations as getAllLocations,
  dbGetLocation as getLocation,
};

// Legacy export — async migration required at the call site.
export const locations: Location[] = [];
