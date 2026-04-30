"use client";
import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps the public-site Navbar + Footer (and the floating contact button).
 * Renders nothing on /admin/* routes so the admin panel keeps its own chrome.
 */
export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
