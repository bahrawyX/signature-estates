"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Briefcase,
  Newspaper,
  LogOut,
  Eye,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/locations", label: "Locations", icon: MapPin },
  { href: "/admin/developers", label: "Developers", icon: Briefcase },
  { href: "/admin/news", label: "News", icon: Newspaper },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loggingOut, setLoggingOut] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  const SidebarInner = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-white/10">
        <Link href="/admin" className="block">
          <p className="font-accent text-[10px] tracking-[0.3em] text-[var(--color-gold)]">
            Signature Estates
          </p>
          <p className="mt-2 font-display text-xl text-white">Admin Panel</p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6">
        <p className="px-3 mb-3 font-accent text-[9px] tracking-[0.24em] text-white/40">
          Manage Content
        </p>
        <ul className="space-y-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 transition-colors text-sm",
                    active
                      ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)] border-l-2 border-[var(--color-gold)]"
                      : "text-white/70 hover:bg-white/5 hover:text-white border-l-2 border-transparent",
                  )}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer actions */}
      <div className="border-t border-white/10 p-4 space-y-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 text-xs text-white/60 hover:text-[var(--color-gold)] transition-colors"
        >
          <Eye size={14} />
          View live site
        </Link>
        <button
          onClick={logout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs text-white/60 hover:text-white transition-colors disabled:opacity-50"
        >
          <LogOut size={14} />
          {loggingOut ? "Logging out…" : "Log out"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-[var(--color-dark)] text-white px-5 py-4 border-b border-white/10">
        <Link href="/admin" className="font-display text-lg">
          Estates Admin
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="p-2 -mr-2"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-[var(--color-dark)] text-white flex-col fixed inset-y-0 left-0 z-30">
        {SidebarInner}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-[var(--color-dark)] text-white flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
            {SidebarInner}
          </aside>
        </div>
      )}
    </>
  );
}
