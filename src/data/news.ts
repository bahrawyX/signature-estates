import type { NewsArticle } from "@/lib/types";
import { dbGetAllArticles, dbGetArticle } from "@/lib/db";

export {
  dbGetAllArticles as getAllArticles,
  dbGetArticle as getArticle,
};

// Legacy export — async migration required at the call site.
export const news: NewsArticle[] = [];
