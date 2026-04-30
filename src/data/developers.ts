import type { Developer } from "@/lib/types";
import { dbGetAllDevelopers, dbGetDeveloper } from "@/lib/db";

export {
  dbGetAllDevelopers as getAllDevelopers,
  dbGetDeveloper as getDeveloper,
};

// Legacy export — async migration required at the call site.
export const developers: Developer[] = [];
